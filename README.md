# reactions
Link for the video demo of the application: https://drive.google.com/drive/folders/1PWBHVMEx4KE_mcTtQ9SgIeOW2dKcjoFP?usp=sharing

This is a social media application which is created with MERN stack.
Features implemented in this application: 
   1. Create a post.
   2. See all posts by all users.
   3. Delete the post.
   4. Like/dislike/comment on a post.
   5. User can delete his own comment or a user who has created the post can also delete comments on his post.
   6. User can see the details of the post on profile details page.
   7. Basic signin/signup functionality.
   8. Search for a specific user.
   9. Follow/Unfollow a user.
   10. See posts by user in his profile.
   11. Update profile info along with profile photo and timeline photo.
   12. There is also an option to reset the password in case user forgots his password.

For styling no framework is used the styling of entire application is done with vanilla css.

.env configuration for backend: 

MONGO_URI = 'mongodb://localhost:27017/reactions'.

PORT = 8080.

JWT_SECRET = can be anything.

CLIENT_URL=http://localhost:3000.

 .env configuration for frontend
 
REACT_APP_API_URL=http://localhost:8080/api/

To start the server use "npm run server".

To start the frontend application use "npm start".
