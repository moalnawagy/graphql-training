# graphql-training

Using grahpql and mongodb create two collections User model and blog model: 
User model : 
- name
- Email
- Password
- Blogs ( array of objectIds)
Blog model:
- title
- Desc
- Price
- Picture( array ) 
User APIs:
- signup (confirm email,hash password) 
- Sign in
- Update profile( not include password)
- Update password ( hash new password ) 
- Forget password ( hash new password ) 
- Delete user by account owner or admin
- Get all users with their blog info
Blog APIs: 
- Add blog
- Delete blog by admin and blog owner
- Update blog by blog owner only 
Notes:
- apply joi validation for each api require data entry from use
