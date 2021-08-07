# EasyBlog

<p align="center">
  <img src="https://i.ibb.co/xhZnYK2/site-logo-github.png">
</p>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

Angular web application for reading and creating blogs, like and comment on blogs and earn achievements!

You can check it out on: http://easy-blog-angular.github.io/

# 🛠  Built with:
- Angular
- Firebase Firestore Database
- Firestore Authentication
- Firestore Image Storage
- Google Sign-In
- CKEditor 
- Custom validation alerts (toasts)
- Custom loader spinner
- Custom profanity filter
- ngx-sharebuttons
- HTML5 Clipboard API
- IpData API
- Cypress Integration tests
- Angular animations
- MomentJS

# Permissions:
|  **Permissions**              |Logged in User|Guest |Admin |
|----------------|-------------------------------|--------|----------|
|Lading page  |✅|✅|✅
|All Blogs   |✅|✅|✅
|Blog Article   |✅|✅|✅
|Blog Article -> likes   |✅|❌|✅
|Blog Article -> comments|✅|❌|✅
|Profile |✅|✅|✅
|Login/ Register |❌|✅|❌
|Writing a blog|✅|❌|✅
|Leaderboard|✅|❌|✅
|Bookmarks|✅|❌|✅
|Profile page|✅|✅|✅
|Chat|✅|❌|✅
|Admin Dashboard |❌|❌|✅
|Admin users manage |❌|❌|✅
|Admin chat manage|❌|❌|✅
|Admin blogs manage|❌|❌|✅
|Admin logs manage|❌|❌|✅

# Pages:
## Public Pages:
**Home page**

This is the landing page of the application, from here you can view the blogs or write a new blog after you register. The page title also moves using the angular animations.
![Home Page](https://i.ibb.co/pnnLCSK/home.png)

**All Blogs**

In this page, all written blogs are displayed, here you can get brief information about the blog (such as likes, comments, views etc.). The page also allows you to sort the blogs by the number of views each one has. You can also search blogs by category (or tag) using the buttons on the right side of the page.
![All Blogs](https://i.ibb.co/5B0PqRf/home.png)

**Writing a blog**

From this page, you can create a new blog. After choosing an apropriate title and tags, you can add a heading image for the blog, This image will be uploaded to the Fireabase Image storage. Using the **CKEditor**, you have a great opportunity  while writing your content. You can place hyperlinks, bullets, and other text editor magic. But beware: all curse and bad words you write in the content will be replaced by asterics '*'. Upon clicking the blue save button, your blog will be created.

![Writing a blog](https://i.ibb.co/zZpRX9Q/home.png)

**Blog Article page**

After clicking 'Read More' on the all blogs page, you will be redirected to the blog article page. Here you can view the whole blog article, as well as see it's image in it's whole beauty. With the help of the **ngx-sharebuttons**, you can share the blog to all your favourite social media websites, and you can also copy the link to the article in your clipboard using the last 'link' button (this is done using the html5 clipboard api). The blog writer and the administrator can edit/or delete/ a blog once it is written. On this page you can also see all the comments the other users have posted. After you login you will also be able to post comments and like the blog using the heart button. From here, the reader can see relevent articles on the right and continue reading them.

![Blog Article](https://i.ibb.co/Q8JS8MX/blog-article.png)

**User profile page**

After you click on the author of a blog article, you will be redirected to their profile. Here you can see all the blogs they have written, their bio, and their achievements. For now the achievements are are given after the user surpasses a certain amount of blogs written (currently ; 1, 5, 10, 20, 50 and 100). The owner of the profile, as well as the admin, can see the last 10 people who visited that profile, something like how you can see who visited you profile on LinkedIn.
![User profile page](https://i.ibb.co/x6dpvP6/home.png)
![User Profile page 2](https://i.ibb.co/bKz89K3/visitations.png)

**Leaderboard page**

Here you can see the platform's top supporters the bloggers with the most blogs written.
![Leaderboard page](https://i.ibb.co/Y8LXV6T/home.png)

**Open Chat**

On this page everyone in the website can openly chat with the others. Their messages will be hidden after one day. Clicking on a message will take you to the writer's profile page.
![Chat](https://i.ibb.co/5TmBDDC/home.png)

**Bookmarks**

On this page the user can see the blogs they have bookmarked so that they can view them at a later time. They can also remove the blogs from their bookmark list using the red delete button
![Bookmarks](https://i.ibb.co/bmMzgTb/bookmarks-tab.png)

**Login and Register pages**

Here the guest can register and login. If they already have a profile, they can you the google sign in button!
*DISCLAIMER: This photo shows two pages, I just didn't want to upload two pictures here :))*
![Register/Login pages](https://i.ibb.co/6Ft8xGg/login-reg.png)

## Admin Pages:

**Admin Dashboard**

On this page the admin can see general statistical info about the Easy-Blog platform. Upon clicking one of the cards, the admin will be redirected to the corresponding management page.
![Admin dashboard](https://i.ibb.co/V06VgFB/admin-dashboard.png)

**Chat Management**

The administrator can see ALL sent messages.Ever. The admin can also delete messages, if they sound too inappropriate :)
![Admin chat dashboard](https://i.ibb.co/G0HDKbS/admin-chat.png)

**Blogs Management**

Here the administrator can see a more detailed info about the blogs, such as their ID's, creation dates, likes and other. From here, the admin can also delete the blogs.
![Admin blogs dashboard](https://i.ibb.co/syL7h2M/admin-blogs.png)


**Users Management**

In this table the admin can see more info about the users, such as their ID's,  emails and other. From here the admin can also freeze and unfreeze users. Frozen users cannot acces the chat, cannot write blogs and comment on existing blogs.
![Admin users dashboard](https://i.ibb.co/jWsbS83/admin-users.png)

**Logs Management**

Here, the admin can see the saved logs. A log is saved when a user visits the Home, Blog or Profile pages. This info is collected only for statistical reasons. The admin can also delete the logs if they choose to. By using the 'Purge' button, the admin can delete all the logs.
![Admin logs dashboard](https://i.ibb.co/93WqfjS/admin-logs.png)

## Testing:

**Cypress inregration tests results**

![Cypress testing results](https://i.ibb.co/Jv31nRs/integration-tests.png)
