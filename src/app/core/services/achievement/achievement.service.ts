import { Injectable } from '@angular/core';
import { Achievment } from '../../models/user/achievment';
import { UserService } from '../user/user-service.service';
import { User } from '../../models/user/user';
import { BlogService } from '../blog/blog.service';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class AchievementService {
  private achievmentImgUrl: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png';

  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private chatService: ChatService
  ) {}

  private achievementTypes: any = {
    chat: 'https://icon-library.com/images/speak-icon-png/speak-icon-png-29.jpg',
    blog: 'https://image.flaticon.com/icons/png/512/1973/1973807.png',
    misc: 'https://www.shareicon.net/data/512x512/2016/12/19/863777_win_512x512.png',
    comment:
      'https://i.ibb.co/wM6RC1Q/comment-icon-vector-removebg-preview.png',
  };

  addAchievementToUser(userId: string, content: string, type: string) {
    let user!: User;
    this.userService.getAllUsers().subscribe((users) => {
      user = users.filter((x) => x.id == userId)[0];

      if (user.achievements?.some((x) => x.content == content)) {
        return;
      }
      let achievement: Achievment = {
        content: content,
        imgUrl: this.achievementTypes[type],
      };

      user.achievements?.push(achievement);
      this.userService.updateUser(user);
    });
  }

  checkIfUserIsEligbleForBlogAchievements(userId: string) {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      let blogsWritten = blogs.filter((x) => x.user.id == userId).length;

      if (blogsWritten >= 1)
        this.addAchievementToUser(userId, '1 blog written!', 'blog');
      if (blogsWritten >= 5)
        this.addAchievementToUser(userId, '5 blogs written!', 'blog');
      if (blogsWritten >= 10)
        this.addAchievementToUser(userId, '10 blogs written!', 'blog');
      if (blogsWritten >= 20)
        this.addAchievementToUser(userId, '20 blogs written!', 'blog');
      if (blogsWritten >= 50)
        this.addAchievementToUser(userId, '50 blogs written!', 'blog');
      if (blogsWritten >= 100)
        this.addAchievementToUser(userId, '100 blogs written!', 'blog');
    });
  }

  checkIfUserIsEligbleForChatAchievements(userId: string) {
    this.chatService.getAllMessages().subscribe((messages) => {
      let messagesWritten = messages.filter((x) => x.user.id == userId).length;

      if (messagesWritten >= 7)
        this.addAchievementToUser(userId, 'Conversation started', 'chat');
      if (messagesWritten >= 20)
        this.addAchievementToUser(userId, 'Casual talker', 'chat');
      if (messagesWritten >= 20)
        this.addAchievementToUser(userId, 'Spammer', 'chat');
    });
  }

  checkIfUserIsEligbleForCommenterAchievements(userId: string) {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      let commentsWritten = blogs.filter((x) =>
        x.comments?.some((x) => x.user.id == userId)
      ).length;

      if (commentsWritten >= 5)
        this.addAchievementToUser(userId, 'Shy commenter', 'comment');
      if (commentsWritten >= 15)
        this.addAchievementToUser(userId, 'Confident commenter', 'blog');
      if (commentsWritten >= 30)
        this.addAchievementToUser(userId, 'Experienced commenter', 'blog');
    });
  }
}
