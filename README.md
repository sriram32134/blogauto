Global Blog Hub – QA Automation Framework

A practical end-to-end QA automation project built using Playwright and JavaScript to test the major workflows of a blog-based web application.

This project is designed not only to automate functional test cases, but also to demonstrate how an automation framework behaves when the application itself contains a defect.

The goal is to show a realistic QA workflow:

Test → Detect Failure → Investigate → Identify Whether It Is a Test Issue or Application Defect → Understand Its Impact on Other Workflows





🎯 Project Objective

The objective of this project is to automate important user workflows and validate whether the application behaves according to the expected requirements.

The automation framework covers:

Authentication Testing
Home & Blog Discovery Testing
Blog Management Testing
Admin Workflow Testing
Negative Testing
End-to-End Testing

The project uses reusable Page Objects, fixtures, test data, and Playwright's built-in reporting and debugging capabilities.


The purpose of automation is to accurately validate application behavior.

When the application behaves differently from the expected result, the automation should report the failure rather than modifying the test simply to make it pass.

Expected Behavior
       ↓
Automated Test
       ↓
Actual Application Behavior
       ↓
PASS / FAIL
       ↓
Failure Investigation
       ↓
Defect Identification

This project demonstrates both functional validation and defect detection.




🐞 Defect Detection

The automation validates expected application behavior and reports failures when the actual behavior differs from the expected result.

A positive test can therefore expose an application defect.

Create Blog Defect

The Blog CRUD automation successfully identified an issue with the application's Create Blog functionality.

The test performs:

Login
  ↓
My Space
  ↓
Create Blog
  ↓
Enter Valid Blog Data
  ↓
Publish
  ↓
Verify Created Blog

The expected result is that the newly created blog appears in the user's dashboard.

However, the application does not successfully create/display the newly submitted blog, causing the verification assertion to fail.

The automation therefore reports:

Create Blog → FAIL

This failure represents an application-level defect, rather than being hidden by weakening the test assertion.

🔎 Key QA Outcome

The project successfully identified an application-level defect through automated testing.

The failure was investigated and confirmed to originate from the application's Create Blog functionality rather than being treated as an automation failure.

This demonstrates that the automation framework can:

Detect unexpected application behavior
Distinguish application failures from automation issues
Provide evidence of the failure
Identify defects in functional workflows
Reveal the impact of defects on dependent E2E scenarios

The purpose of the automation is not only to verify working functionality, but also to successfully identify defects when they occur.





💥 Impact of the Defect on End-to-End Testing

The Create Blog functionality is also part of the complete End-to-End workflow.

The intended E2E flow is:

Login
  ↓
Home
  ↓
Search / Category
  ↓
Open Blog
  ↓
Create Blog
  ↓
Verify Blog
  ↓
Edit Blog
  ↓
Delete Blog
  ↓
Logout

Because the Create Blog functionality is not working correctly, the dependent steps cannot be reliably validated.

Login
  ↓
Home
  ↓
Search / Category
  ↓
Open Blog
  ↓
Create Blog ❌
  ↓
Edit Blog
  ↓
Delete Blog
  ↓
Logout

This demonstrates how a defect in one functionality can affect a larger end-to-end workflow.

A defect in a critical feature can have a cascading impact on dependent test scenarios.




🔐 1. Authentication Testing

The authentication suite validates both user and administrator workflows.

User Authentication
Valid user login
Invalid email
Invalid password
Empty login fields
Successful login verification
Logout


Admin Authentication
Navigate to Admin login
Valid admin credentials
Invalid admin credentials
Successful admin login verification
Admin logout


🏠 2. Home & Blog Discovery Testing

The Home testing suite validates the major blog discovery workflows.

Test scenarios include:

Home page loading
Blog listing
Blog visibility
Popular Blogs navigation
Search functionality
Search result verification
Category selection
Category-filtered results


📝 3. Blog Management Testing

The blog testing suite covers:

Blog details
Blog creation
Blog editing
Blog deletion
Required-field validation
Blog Details

Validates:

Blog title
Blog content
Author
Category
Comments section where applicable

💬 4. Comments Testing

The comments suite validates:

Adding a valid comment
Verifying the comment appears
Empty comment validation where applicable

Workflow:

Open Blog
   ↓
Comments Section
   ↓
Enter Comment
   ↓
Submit
   ↓
Verify Comment

👨‍💼 5. Admin Workflow Testing
The Admin suite validates selected meaningful administrative workflows supported by the application.

Coverage includes:

Admin authentication
Admin dashboard
Selected admin operations
Expected admin behavior

❌ 6. Negative Testing

Negative testing validates application behavior when invalid or incomplete input is provided.

Scenarios include:

Invalid user login
Empty user login
Invalid admin login
Empty required blog fields
Empty comment
Unauthorized access where applicable

The objective is to verify that invalid operations are handled correctly.

🔄 7. End-to-End Testing

The E2E suite represents a realistic user journey across multiple application features.

Login
  ↓
Home
  ↓
Search / Category
  ↓
Open Blog
  ↓
Create Blog
  ↓
Verify
  ↓
Edit Blog
  ↓
Verify
  ↓
Delete Blog
  ↓
Logout


🛠️ Tech Stack

Automation:

Playwright
JavaScript
Node.js

Framework:

Page Object Model
Playwright Fixtures
Reusable Test Data
Environment Variables

Testing:

Functional Testing
Authentication Testing
CRUD Testing
Negative Testing
Admin Testing
Search Testing
Category Testing
Comments Testing
End-to-End Testing
Regression Testing
Defect Detection

Version Control:
Git
GitHub


🚀 Installation

Clone the Repository

git clone https://github.com/sriram32134/blogauto.git

Navigate to the Project
cd blogauto

Install Dependencies-npm install

Install Playwright

npx playwright install chromium

Configure Environment Variables - Create a .env file using .env.example as a reference.

Add the required application configuration and test credentials locally.


🚫 Scope Exclusions (out of the scope) : more features in the application (out of scope)
The following functionality is intentionally outside the automation scope:

Followers / Following
Followers
Following
Follow / Unfollow
Follower counts
Following counts
Follower/following management
Related follower/following pages and APIs

AI Generation
Generate with AI
AI-generated blog content
AI content generation workflows
AI-related functionality


🎯 Project Outcome
the project demonstrates a practical QA automation workflow where automation is used for both:
Functional Validation
and
Defect Detection

A key outcome of the project was the successful identification of an application-level defect in the Create Blog functionality.

The defect also demonstrated its impact on the dependent End-to-End blog lifecycle, providing practical evidence of how application-level issues can affect higher-level workflows.