import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpRecord } from '../../models/ipRecord/ipRecord';

@Injectable()
export class LogsService {
  recordsCollection!: AngularFirestoreCollection<IpRecord>;
  recordsDoc!: AngularFirestoreDocument<IpRecord>;
  records!: Observable<IpRecord[]>;

  constructor(private http: HttpClient, public afs: AngularFirestore) {
    this.recordsCollection = this.afs.collection('ip-records');
    this.loadRecords();
  }

  loadRecords() {
    this.records = this.recordsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as IpRecord;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getAllLogs() {
    return this.records;
  }

  deleteRecord(log: IpRecord) {
    this.recordsDoc = this.afs.doc(`ip-records/${log.id}`);
    this.recordsDoc.delete();
  }
  getIpData() {
    return this.http.get<IpRecord>(environment.ipdata.url);
  }

  addRecord(page_location: string) {
    this.getIpData().subscribe((data) => {
      this.getAllLogs().subscribe((logs) => {
        let alreadyAdded = logs.some(
          (log) =>
            Date.parse(log.createdOn!) >= this.getToday() &&
            log.ip == data.ip &&
            log.page_location == page_location
        );

        if (alreadyAdded) {
          return;
        }
        let record: IpRecord = {
          createdOn: new Date().toLocaleString('en-US'),
          city: data.city,
          continent_code: data.continent_code,
          continent_name: data.continent_name,
          country_code: data.country_code,
          country_name: data.country_name,
          ip: data.ip,
          page_location: page_location,
        };
        this.recordsCollection.add(record);
      });
    });
  }

  getToday(d = new Date()) {
    return new Date(+d).setHours(0, 0, 0, 0);
  }

  purgeLogs() {
    this.records.subscribe((records) => {
      records.forEach((record) => this.deleteRecord(record));
    });
  }
}
