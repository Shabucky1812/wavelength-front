import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Determines if the resource has more content to be loaded and fetches it if so.
 * 
 * @param {dict} resource - dictionary containing info about the passed in resource
 * @param {function} setResource - function to update resource
 */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    // console.log(err)
  }
};

/**
 * updates info around a new following
 * 
 * @param {dict} profile - profile doing the following
 * @param {dict} clickedProfile - profile being followed
 * @param {integer} following_id - id that represents the following instance being created
 * 
 * @returns changes to be made (if any) to the profile info
 */
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : profile;
};

/**
 * updates info around an unfollowing
 * 
 * @param {dict} profile - the profile doing the unfollowing
 * @param {dict} clickedProfile the profile being unfollowed
 * 
 * @returns changes to be made (if any) to the profile info
 */
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count - 1,
      }
    : profile;
};

/**
 * sets refresh token for a signed in user
 * 
 * @param {dict} data - data about the sign in taking place
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
  localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp)
}

/**
 * determines if a token should be refreshed
 * 
 * @returns boolean value based on whether the user is logged in
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp')
}

/**
 * removes refresh token
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp')
}