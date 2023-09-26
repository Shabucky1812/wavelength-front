# Wavelength Testing

## Automated Testing

### HTML validation:  
All of the HTML written for this website was validated using [this HTML validator](https://validator.w3.org/).  

#### Discover/Feed Pages:
![HTML validator results for discover/feed pages](/documentation/testing/html-discover-page.png)  

#### Search Page:
![HTML validator results for search page](/documentation/testing/html-search-page.png)  

#### Profile Page:
![HTML validator results for profile page](/documentation/testing/html-profile-page.png)  

#### Share Track Page:
![HTML validator results for share track page](/documentation/testing/html-share-track-page.png)  

#### Sign In Page:
![HTML validator results for sign in page](/documentation/testing/html-sign-in-page.png)  

#### Sign Up Page:
![HTML validator results for sign up page](/documentation/testing/html-sign-up-page.png)  

### CSS validation:  
All of the CSS written for this website was validated using [this CSS validator](https://jigsaw.w3.org/css-validator/).  

#### Asset.module.css:
![CSS validator results for Asset.module.css](/documentation/testing/css-asset.png)  

#### Avatar.module.css:
![CSS validator results for Avatar.module.css](/documentation/testing/css-avatar.png)  

#### Button.module.css:
![CSS validator results for Button.module.css](/documentation/testing/css-button.png)  

#### Form.module.css:
![CSS validator results for Form.module.css](/documentation/testing/css-form.png)  

#### NavBar.module.css:
![CSS validator results for NavBar.module.css](/documentation/testing/css-navbar.png)  

#### ProfileEditForms.module.css:
![CSS validator results for ProfileEditForms.module.css](/documentation/testing/css-profile-edit-forms.png)  

#### ProfilePage.module.css:
![CSS validator results for ProfilePage.module.css](/documentation/testing/css-profile-page.png)  

#### ProfilePreview.module.css:
![CSS validator results for ProfilePreview.module.css](/documentation/testing/css-profile-preview.png)  

#### ProfileSearch.module.css:
![CSS validator results for ProfileSearch.module.css](/documentation/testing/css-profile-search.png)  

#### Review.module.css:
![CSS validator results for Review.module.css](/documentation/testing/css-review.png)  

#### ReviewCreateEditForm.module.css:
![CSS validator results for ReviewCreateEditForm.module.css](/documentation/testing/css-review-create-edit-form.png)  

#### SignInUpForm.module.css:
![CSS validator results for SignInUpForm.module.css](/documentation/testing/css-sign-in-up-form.png)  

#### Track.module.css:
![CSS validator results for Track.module.css](/documentation/testing/css-track.png)  

#### TrackCreateEditForm.module.css:
![CSS validator results for TrackCreateEditForm.module.css](/documentation/testing/css-track-create-edit-form.png)  

#### TracksPage.module.css:
![CSS validator results for TracksPage.module.css](/documentation/testing/css-tracks-page.png)  

### JSX validation:   
All of the custom components and pages written in JSX for this project have been validated using [ESLint](https://eslint.org/). Before revieving the results below, please read this important information first. As they relate to code taught in the Code Institute Moments walkthrough, I have ignored the following errors:
- Do not use array index in keys.
- 'variable' is already declared in upper scope.
- Expected an assignment or function call and instead saw an expression.
- Do not pass children as props.
- Props spreading is forbidden.
- Do not nest ternary expressions.
- Fragments should contain more than one child

Additionally, errors regarding variable names not being in camelcase have been ignored because the variables in question represent values received from the API. As a final note, this version of the project includes this line: `/* eslint-disable */` at the top of any files including these errors listed above in order for the project to run.

#### Components files:
![ESLint results for the components files](/documentation/testing/jsx-components.png)  

#### Authentication Pages:
![ESLint results for the authentication pages](/documentation/testing/jsx-auth-pages.png)  

#### Profiles Pages:
![ESLint results for the profiles pages](/documentation/testing/jsx-profiles-pages.png)  

#### Reviews Pages:
![ESLint results for the reviews pages](/documentation/testing/jsx-reviews-pages.png)  

#### Tracks Pages:
![ESLint results for the tracks pages](/documentation/testing/jsx-tracks-pages.png)  

### Jest Testing:  
Alongside the manual testing carried out for this project, some basic jest testing has been implemented for the NavBar component.

For additional information regarding the tests written, please see the following file:
- [NavBar.tests.js](/src/components/__tests__/NavBar.tests.js)

The results for these tests can be seen below:  
![Jest results](/documentation/testing/jest-tests.png)  

As you can see, all of the jest tests written for this version of the project are passing. I would have liked to implement much more extensive jest testing, however I only have a realistic amount of time to spend on this project so this will have to do for now.

### Lighthouse results:  
Google DevTools provides a service called Lighthouse report which I use to confirm that my code is accessible. The results of this report for each page can be seen below:  

#### Discover Page:
![Lighthouse results for discover page](/documentation/testing/lighthouse-discover.png)  

#### Search Page:
![Lighthouse results for search page](/documentation/testing/lighthouse-search-page.png)  

#### Profile Page:
![Lighthouse results for profile page](/documentation/testing/lighthouse-profiles-page.png)  

#### Share Track:
![Lighthouse results for share track page](/documentation/testing/lighthouse-share-track.png)  

#### Sign In Page:
![Lighthouse results for sign in page](/documentation/testing/lighthouse-sign-in.png)  

#### Sign Up Page:
![Lighthouse results for sign page](/documentation/testing/lighthouse-sign-up.png)  

## Manual Testing

### User Stories  
To show how the features of this website meet the requirements of the user stories, I have created this chart that demonstrates which features are relevant to each user story:  

| User Story | Achieved | Relevant Features |
|------------|----------|-------------------|
| US01 - Create new account | YES | F01 - Navbar (Logged Out), F03 - Sign Up Form |
| US02 - Sign in | YES | F01 - Navbar (Logged Out), F04 - Sign In Form |
| US03 - Sign out | YES | F02 - Navbar (Logged In) |
| US04 - Edit profile | YES | F16 - Profile Edit Forms |
| US05 - Delete profile | NO | (\*read more about below) |
| US06 - View profiles | YES | F13 - Profiles Search Bar, F14 - Profile Previews, F15 - Profile Page |
| US07 - Follow/Unfollow profiles | YES | F14 - Profile Previews, F15 - Profile Page |
| US08 - Search profiles | YES | F13 - Profiles Search Bar |
| US09 - Share tracks | YES | F07 - Share Track Form |
| US10 - Edit track | YES | F09 - Edit Track Form |
| US11 - Delete Track | YES | F08 - Track |
| US12 - View tracks (list formats) | YES | F08 - Track, F05 - Tracks Search Bar |
| US13 - View tracks (detailed view) | YES | F08 - Track |
| US14 - Search tracks | YES | F05 - Tracks Search Bar, F06 - Genre Filter |
| US15 - Create review | YES | F10 - Review Create Form |
| US16 - Edit review | YES | F12 - Edit Review Form |
| US17 - Delete review | YES | F11 - Reviews |
| US18 - View reviews | YES | F11 - Reviews |
| US19 - Accessibility | YES | 100 accessibility score on all lighthouse reports |
| US20 - Positive site experience | YES | styling throughout |

\* I ultimately decided not to include profile deletion in this version of the project. It's not a necessary or major feature and I wanted to spend more time on the more important features (tracks/reviews). If the site was to develop popularity, then I would consider adding this feature.

### Functionality  
| Test Label | Test Action | Expected Outcome | Test Outcome |
|------------|-------------|------------------|--------------|
| Navigation - Logged Out | Use all available links from the navbar whilst logged out | Links should send user to right location | PASS |
| Navigation - Logged In | Use all available links from the navbar whilst logged in | Links should send user to right location | PASS |
| Sign Up | Try to create a new account | New profile should be created with submitted username + user should redirect to sign in form | PASS |
| Sign In | Try to sign in with valid data | User should be signed in to relevant account | PASS |
| Logged in redirect | Try to access sign in + up forms whilst logged in | User should redirect instead of rendering forms | PASS |
| Tracks Filter | Use search + genre filters on tracks | Tracks should be filtered appropriately | PASS |
| Share Track | Try to share a new track | New track should be created | PASS |
| Edit Track | Attempt to edit a track's data | Track should be edited correctly | PASS |
| Delete Track | Try to delete a track | Track should be deleted | PASS |
| Review Form Rendering | See if review form renders in various states | Form should appear if authenticated + unreviewed, not if otherwise | PASS |
| Create Review | Attempt to review a track | Review should be created and listed below track | PASS |
| Edit Review | Edit a review | Review should be updated accordingly | PASS |
| Delete Review | Try to delete a review | Review should be deleted | PASS |
| Search Profiles | Use search page to find profiles | Profiles should be filtered according to query | PASS |
| Follow/Unfollow | Use follow and unfollow buttons on preview + profile page | Profiles should be followed/unfollowed | PASS |
| Edit Profile | Use profile editing forms | Profile details should be edited | PASS |
| Sign Out | Sign out of an account | User should be signed out and returned to the discover page | PASS |

### Browser Compatibility  
This website fully functions on the following web browsers:  
- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## Bugs

### Known Bugs:  

### Solved Bugs:  

### Responsiveness:  
Wavelength was built with responsiveness in mind throughout. The best way to view this for yourself would just be to view the live site and adjust the screen size. I have included example screenshots for the site at small and large screens below.

320px screen size:  
![Example screen for 320px screen size.](/documentation/testing/responsiveness-small.png)  

4k screen size:  
![Example screen for 4k screen size.](/documentation/testing/responsiveness-large.png)  

Return to [README](README.md)