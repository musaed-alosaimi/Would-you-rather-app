import {ADD_TWEET, TWEET_LIKE} from './actions/ActionConstants'
  
  
  const RETREIVE_TWEETS_FROM_API = "RETREIVE_DATA_FROM_API";
  const TWEET_REPLY = "TWEET_REPLY";

  export function tweets_reducer(state = [], action) { // state = tweets

    if (action.type === RETREIVE_TWEETS_FROM_API) {

      return {...state, ...action.tweets};

    } else if (action.type === TWEET_LIKE) {

      let tweet = state[action.tweet_id];

      let newState;

      if(tweet.likes.includes(action.user_id)){

        let likesArray = tweet.likes.filter((user_id) => action.user_id !== user_id)

        newState = {...state, [action.tweet_id]: {...tweet, likes: likesArray}}

      }else{

        let likesArray = [...tweet.likes, action.user_id];
        newState = {...state, [action.tweet_id]: {...tweet, likes: likesArray}}

      }

      return newState;

    } else if (action.type === TWEET_REPLY) {

    } else if (action.type === ADD_TWEET) {

        state[action.tweet.id] = action.tweet;

        return state;
    }

      return state;

  }

  export function users_reducer(state = [], action) {

    if (action.type === RETREIVE_TWEETS_FROM_API) {
      return action.users;
    }

    return state;

  }

  export function retreive_data(users, tweets) {

    return {
      type: RETREIVE_TWEETS_FROM_API,
      users, tweets
    }

  }

