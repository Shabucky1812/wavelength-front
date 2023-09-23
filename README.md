# Wavelength 
![amiresponsive results for Wavelength](/documentation/readme/amiresponsive.png)  

[View the Live Website here](https://wavelength-front-8ca0988d00ea.herokuapp.com/)

Wavelength is a social media community for sharing music. The Wavelength website is designed to make this process fun and seamless. Like with other social media
websites, users of Wavelength can create and customise their own profiles. Authenticated users can then access all of the functionality that Wavelength has to offer.
Users can share tracks they have been enjoying and review the tracks shared by other people. Tracks can be found through a variety of convenient filters, search fields, and ordering options. Additionally, users can follow the profiles of other users to tailor their feed to their taste in music. The overall aim of
Wavelength is to provide a community environment for people to connect through music.

To view the planning board used throughout this project's creation, [use this link](https://github.com/users/Shabucky1812/projects/3).

## Contents
- [UX](#ux)  
- [Design](#design)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Deployment](#deployment)  
- [Testing](#testing)  
- [Credits](#credits)  

## UX

### User Stories:  

#### EPIC: User Accounts/Profiles

- US01 - Create new account
    - As a user I can create a new Wavelength account so that I can interact with the site's features and other users, and be a part of the community.

- US02 - Sign in
    - As a user I can sign in to an existing account so that I can access my account and my shared tracks/reviews/etc...

- US03 - Sign out
    - As a signed-in user I can sign out of my account so that I can prevent same-device users from accessing my account/sign in to a different account.

- US04 - Edit profile
    - As a user I can edit my profile so that I can customise my presence using Wavelength.

- US05 - Delete profile
    - As a user I can delete my profile so that I can erase my profile info should I not want to interact with Wavelength anymore.

- US06 - View profiles
    - As a user I can view user profiles (others and my own) so that I can interact with the Wavelength community and view more content from users I like.

- US07 - Follow/Unfollow profiles
    - As a user I can follow/unfollow other profiles so that I can customise my feed to show content that is more relevant to me.

- US08 - Search profiles
    - As a user I can search for specific profiles so that I can find profiles to view/follow/unfollow.

#### EPIC: Tracks

- US09 - Share tracks
    - As a user I can share a track so that I can share music I'm enjoying with the community and see what they think about it too.

- US10 - Edit track
    - As a track owner I can edit details about the shared track so that I can correct mistakes or change my opinion.

- US11 - Delete Track
    - As a track owner I can delete any of the tracks I have shared so that I can remove them from my profile.

- US12 - View tracks (list formats)
    - As a user I can view shared tracks so that I can get new music recs and see what people are enjoying.

- US13 - View tracks (detailed view)
    - As a user I can view a specific track in more detail so that I can view the track's reviews.

- US14 - Search tracks
    - As a user I can search for tracks in a number of ways so that I can easily access the content I am more interested in.

#### EPIC: Reviews

- US15 - Create review
    - As a user I can create a review for each track so that I can share my opinion on the music.

- US16 - Edit review
    - As a review owner I can edit my review so that my review reflects any changes of mind I have had about the track.

- US17 - Delete review
    - As a review owner I can delete my review so that I don't have to share my opinion if I don't want to.

- US18 - View reviews
    - As a user I can view other reviews so that I can see how other people feel about a track.

#### EPIC: User Experience

- US19 - Accessibility
    - As a user with additional requirements I can still access and enjoy all features of the website so that I am still able to be a part of the community.

- US20 - Positive site experience
    - As a user I can easily enjoy using the website so that I have a seamless and positive experience interacting with Wavelength.

### Wireframes:

During the planning process of this project, the following wireframes were created (using [Balsamiq](https://balsamiq.com/)) to visualize how the site should
be structured and plan how a user would traverse through the site.

1. Discover/Feed Page:
    ![Template wireframes for discover/feed page on desktop and mobile.](/documentation/readme/wireframes/discover-page.png)  
    This wireframe shows the structure of the discover page (and the feed page as the structure will remain the same with different tracks being loaded) which
    will serve as Wavelength's index page. This page will allow users to scroll through the most recently shared tracks (only those by users they follow on the feed page) as well as letting them filter the tracks by score and genre.

2. Search Page:
    ![Template wireframes for search page on desktop and mobile.](/documentation/readme/wireframes/search-page.png)  
    This wireframe shows the search page that allows the user to look for specific tracks and profiles. This makes searching for specific content quicker for a better
    overall experience.

3. Track Page:
    ![Template wireframes for track page on desktop and mobile.](/documentation/readme/wireframes/track-page.png)  
    This user will be brought to this page upon clicking on an individual track. They are shown the track in more detail as well as the reviews for the track left by other users. This is also where they will be able to edit or add their review.

4. Profile Page:
    ![Template wireframes for profile page on desktop and mobile.](/documentation/readme/wireframes/profile-page.png)  
    Users will be able to view profiles from pages based on this wireframe. The profile page will display a quick overview of the user, followed by a list of their shared tracks.

5. Sign-In/Sign-Up/Sign-Out Pages:
    ![Template wireframes for sign-in page on desktop and mobile.](/documentation/readme/wireframes/sign-in-page.png)  
    The pages for signing in, up, and out will all look similar to the sign in page mocked above and behave as you would expect them to.

## Design

### Colour Scheme:  

Wavelength uses the following colour palette, generated using [Coolors](https://coolors.co/):  
![Wavelength colour palette.](/documentation/readme/coolors.png)  
As Wavelength is a social media site, I wanted the colour scheme to be simple and to create a cozy, dark-mode, kind of vibe. To achieve this, the only main colour used on the site is a dark grey (Onyx - #2E3532), this colour is used as the main background colour throughout with a slightly darker shade being used as the background of certain components (e.g. navbar, tracks, reviews). For the main text of the site to have suitable contrast, I chose a cloudy white (Alabaster - #E0E2DB) which is used for most of the site's text. The remaining colours are used to add a little more interest to the site and also to subtly provide information to the user, for example active nav links remain the orange (Carrot Orange - #F18F01) shade to remind the user where they are located. The blue (Moonstone - #08B1C4) is mainly used for the Track component, as it stands out nicely against the orange.

### Typography:

Wavelength uses only one font from [Google Fonts](https://fonts.google.com/):  
- Montserrat:
    ![Montserrat font from Google Fonts](/documentation/readme/montserrat.png)  
    The montserrat font is used for all text throughout the site. To provide some variation, different headers and important bits of text are different font-weights (400 - for basic text, 700 - for important text, 900 - for main h1) and some are italic. I like this font for Wavelength because it is modern and easily-readable. I also like how the different font weights provide contrast and help guide the user.

## Features  

### Existing Features:  
- __F01 - Navbar (Logged Out)__  
    ![Wavelength Navbar - logged out and large screen](/documentation/readme/nav-logged-out-exp.png)  
    ![Wavelength Navbar - logged out and small screen](/documentation/readme/nav-logged-out-col.png)  
    One of the most important features of the Wavelength website is the Navbar. The navbar is fixed to the top of the screen and present on all pages throughout the site. It is the tool that allows the user to access almost all of the site's pages and also reminds them where they currently are. On larger screens, the navbar is expanded (image 1 - top), and on smaller screens, the navbar collapses (image 2 - bottom). When the user is logged out, the navbar, as seen above, lets them view the discover, sign in, and sign up pages. When the user hovers over a link, a small transition effect turns the link orange and it returns to normal when the cursor leaves. The active link remains orange at all times, for example, in the images above, the discover link is orange because the user is on the discover page. Additionally, the main 'WAVELENGTH' h1 also serves as a link to the discover page.

- __F02 - Navbar (Logged In)__  
    ![Wavelength Navbar - logged in and large screen](/documentation/readme/nav-logged-in-exp.png)  
    ![Wavelength Navbar - logged in and small screen](/documentation/readme/nav-logged-in-col.png)  
    Once the user is authenticated, the navbar updates to the state shown above. The sign in and sign up links are removed an new options are presented. Firstly, a new share track link is revealed, which takes the user to the share track form (see F07 for details). Additionally, the following new links are rendered:
        - Feed - similar to the discover page, except only tracks by profiles the user is following are listed.
        - Search - a search page for the user to look for other profiles.
        - Sign Out - signs the user out and returns them to the home (discover) page as an unauthenticated user.
        - Profile - takes the user to their own profile page, this link appears alongside the user's current profile image as extra confirmation to the user that they are signed in.

- __F03 - Sign Up Form__  
    ![Sign up form](/documentation/readme/sign-up-form.png)  
    The sign up form allows a new user to create a Wavelength profile. It functions as you would expect a typical sign up form to work and takes a username input, and two password inputs (one for confirmation, as is standard). Should the user attempt to sign up with any invalid data, the form will render relevant error messages in response to the failed sign up and let the user try again. Upon successfully signing up for a new account, the user is redirected to the sign in page. Additionally, if a logged in user attempts to access the sign up form, they will be automatically redirected to the discover page, as the content is irrelevant to them.

- __F04 - Sign In Form__  
    ![Sign in form](/documentation/readme/sign-in-form.png)  
    Much like the sign up form, the sign in form works as expected. It takes a username and password input and attempts to log the user in with the data provided. If the data is invalid, the form communicated the errors in the same way as the sign up form. Logged in users are once more redirected to the discover page upon trying to reach the sign in form.

- __F05 - Tracks Search Bar__  
    ![Search bar for tracks](/documentation/readme/tracks-search-bar.png)  
    At the top of both the discover and feed pages are two filtering options, the first of which is the tracks search bar. A user can enter text into the search bar and (after a half second delay, for better UX), the tracks will be filtered by the input value. They are searched by track title, artist, and owner, and if no results are found, a simple message is displayed to the user, telling them to adjust the filters.

- __F06 - Genre Filter__  
    ![Genre filter for tracks](/documentation/readme/genre-filter.png)  
    ![Expanded genre filter](/documentation/readme/genre-filter-exp.png)  
    The second filtering option present on the discover and feed pages is the genre filter as seen above (second image shows available options). Users can use this dropdown to filter tracks by genre. If no tracks are returned, once more a simple message telling the user to adjust the filters is displayed. Users can filter the tracks using both the search bar and genre filter at the same time (if they are on the feed page, the tracks will also be filtered by profiles the user follows). As a general note around the tracks list, regardless of filters, the tracks returned are always displayed with the most recently uploaded/edited appearing first.

- __F07 - Share Track Form__  
    ![Form used to share a new track](/documentation/readme/share-track-form.png)  
    Upon clicking the Share Track button in the navbar, the user is shown the above form used to share a new track! The first two fields are simple text fields for the song's title and artist. Below these is an add image field which the user can interact with by clicking/tapping anywhere within the dashed blue area. This field is designed to take the song's cover art which the user will have to manually upload (for more info about how this will be changed in the future, please see the future implementations below). This field additionally validates any uploaded image to make sure it is not larger than 2mb to prevent the website's performance being hindered. Once the user has uploaded an image using the field, the add image area is replaced with a preview of the image and the text changes to 'change image'. A user can click/tap the area again to change the image. Next, is the genre dropdown which lets the user select the most relevant genre for the song. Whilst I am aware that the available genre options are far from exhaustive, I didn't want to oversaturate the choices as I think too many genres would reduce the effectiveness of the genre filter on the discover and feed pages. The final field is a simple text area for the user's opinion of the track. If an unauthenticated user attempts to reach this url, they will be redirected to the discover page. Users can submit the form data by pressing enter or using the share button. A cancel button is also present, which takes the user back to the last page they were on. If the submitted form data is invalid for any reason, the form returns any relevant error messages to the user. If valid, the new track is shared and the user is redirected straight to the track's page.

- __F08 - Track__  
    ![The Track component](/documentation/readme/track.png)  
    Once a track is created, it will be visible on the site in various locations in the above format. Each track is represented as a 'card', mareked out by the blue border. The border extends at the top to create a header of sorts which shows the track's owner (alongside their profile image) on the left side, and how long ago the track was uploaded/edited on the right. The profile picture and owner text also acts as a link to the track owner's profile page. Below, the 'body' of the card is split into 2 columns. The left column displays various pieces of information about the track, starting with the title and artist, then the genre. This is followed by the owner's own opinion and finally the track's average score and how many reviews it has currently received. The track's score is determined by the scores left in the track's reviews (F11), and as such, if the track has no reviews, the score is replaced with a small message communicating this. The right column shows the track's cover art and also acts as a link to the track's detail page. On the track's detail page, the track will look the same to all users except the owner of the track. From the detail page, owners will also be able to see a dropdown to the right of the uploaded/edited text. Using this dropdown, owners can access the track edit form (F09), and an option to delete the track. Upon clicking the delete track option, the track is deleted and the user is returned to the page they were last on. It's worth noting that there is no delete confirmation currently present. If the delete button was always visible, I would have an issue with this and would have some form of confirmation. However, because the owner already has to click on the dropdown to access the delete option, I think the chances of the user accidentally deleting the track are reduced enough.

- __F09 - Edit Track Form__  
    ![Edit track form](/documentation/readme/edit-track-form.png)  
    After clicking on the edit track option from the track dropdown, the track owner will be taken to the above edit form, pre-filled with the track's data. If a user other than the owner of the track attempts to reach this url, they will be redirected to the home page. This form functions identically to the share track form (F07) with the only difference being that instead of creating a new track, the data will instead update the already existing track. The save and cancel buttons also function how you would expect based on the share track form.

- __F10 - Review Create Form__  
    ![Form used to review a track](/documentation/readme/review-create-form.png)  
    ![Already reviewed message](/documentation/readme/already-reviewed.png)  
    On a track's detail page, authenticated users will see the above review create form (image 1 - top) directly below the track. If they've already reviewed the track, the message shown is the second image will be shown instead. Unauthenticated users will not be shown any of this content, only the previous reviews of others (F11). Also, it was not my original intention, but for now, the track owner can also their own track (more on this in future implementations). The review track form very simply receives a text field for the reviewers thoughts on the track, and an integer field for their score. The score field strictly accepts only integer values between 1-100 (inclusive), if the user attempts to submit the form with any values that do not meet this criteria, the form will communicate this error to them. The share button attempts to create the review, as expected. Once a user has successfully created a review for a track, a number of things will happen. Firstly, the form will be replaced by the 'already reviewed' message. Secondly, the review will be added to the reviews list beneath the message (F11). Finally, the track's score and number of reviews will be automatically updated - no refresh needed.

- __F11 - Reviews__  
    ![List of reviews under a track](/documentation/readme/reviews.png)  
    feature11

- __F12 - Edit Review Form__  
    ![Form used to edit reviews](/documentation/readme/edit-review-form.png)  
    feature12

- __F13 - Profiles Search Bar__  
    ![Search bar for profiles on the search page](/documentation/readme/profiles-search-bar.png)  
    feature13

- __F14 - Profile Previews__  
    ![List of profiles on search page](/documentation/readme/profile-previews.png)  
    feature14

- __F15 - Profile Page__  
    ![Example of another user's profile page](/documentation/readme/profile-page.png)  
    feature15

- __F16 - Profile Edit Forms__  
    ![Profile picture edit form](/documentation/readme/edit-profile-image-form.png)  
    ![Profile username edit form](/documentation/readme/edit-profile-username-form.png)  
    ![Profile password edit form](/documentation/readme/edit-profile-password-form.png)  
    feature16

### Future Implementations:  

## Technologies Used

### Languages Used:  

### Frameworks, Libraries, and Programs Used:  

- [Balsamiq](https://balsamiq.com/) - Used to create front-end wireframes during planning of this website.  

## Deployment

## Testing

Please find the testing write-up for this project in [this Testing Document](testing.md).

## Credits

### Contents  

### Acknowledgements  
