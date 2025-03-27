import userDM from "../datamen/userDataManager.js";
import postDM from "../datamen/postDataManager.js";
import sessionDM from "../datamen/sessionDataManager.js";
import {getRandomValues} from "crypto";
import * as timers from "node:timers";
//id, title, author, summary, rating, premium content, ingredients, instructions
class postController {
    check_content(title_in, ingredients_in, instructions_in){
        const titleCheck = new RegExp(/^[a-zA-Z0-9]+$/);
        const ingredCheck = new RegExp(/^[A-Za-z0-9]+.,\/\\\(+\)+\+$/);
        const instructionCheck = new RegExp(/^[A-Za-z0-9]+.,\/\\\(+\)+\+!$/);
        if ((title_in.length <= 64 && ingredients_in.length <= 200 && instructions_in.length <= 2000) === true){
            if (titleCheck.test(title_in) && (ingredCheck.test(ingredients_in)) && (instructionCheck.test(instructions_in)) === true ){
                return true;
            }
            else{
                return ("Server Error");
            }
        }
        else{
            return ("Server Error");
        }
    }
    async create_post (title_in, author_in, premium_content, ingredients_in, instructions_in) {
        if (this.check_content(title_in, ingredients_in, instructions_in) === true){
            return await postDM.create_post(title_in, author_in, "", 0, premium_content, ingredients_in, instructions_in);
        }
        else{
            return false;
        }
    }

    // edit post.... Need tons of work.
    async edit_post (postID , title_in, author_in, premium_content, ingredients_in, instructions_in){
        if (this.check_content(title_in, ingredients_in, instructions_in) === true) {
            return await postDM.update_title(title_in, postID) +
                await postDM.update_premium_content(premium_content, postID) +
                await postDM.update_ingredients(ingredients_in, postID) +
                await postDM.update_instruct(instructions_in, postID);
        }
        else{
            return false;
        }
    }

    async delete_post (postID){
        return await postDM.deletePost(postID);
    }

    async fetch_posts_id (postID) {
        return await postDM.get_all(postID);
    }

    async fetch_posts_title (title_in) {
        return await postDM.get_postByTitle(title_in);
    }

    async fetch_posts_author (author_in) {
        return await postDM.get_postsByAuthor(author_in);
    }

    async fetch_posts_by_status (status_in) {
        return await postDM.get_postsByStatus(status_in);
    }

    async fetch_posts_by_user(user_email){
        const user = await userDM.get_userByEmail(user_email);
        const user_status = user[4];
        if (user_status) {
            return await postDM.get_all();
        }
        else {
            return await postDM.get_postsByStatus(user_status);
        }
    }






    // edit all features of posts, apart from id
    // size restrictions, title (64), summary (150), ingredients (200), instructions (2000)
    // Delete Posts
    // Get Posts
    // Check content against SQL injection or CSS.
    //
}
export default new postController;