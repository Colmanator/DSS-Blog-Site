import userDM from "../datamen/userDataManager.js";
import postDM from "../datamen/postDataManager.js";
import sessionDM from "../datamen/sessionDataManager.js";
import {getRandomValues} from "crypto";
import * as timers from "node:timers";
//id, title, author, summary, rating, premium content, ingredients, instructions
class postController {
    // check content size
    async check_content_size(title_in, summary_in, ingredients_in, instructions_in){
        return title_in.length <= 64 && summary_in.length <= 150 && instructions_in.length <= 200 && instructions_in.length <= 2000;
    }

    // Create Post... Needs tons of work.,
    async create_post (title_in, author_in, summary_in, rating_in, premium_content, ingredients_in, instructions_in) {
        return await postDM.create_post(title_in, author_in, summary_in, rating_in, premium_content, ingredients_in, instructions_in);
    }

    // edit post.... Need tons of work.
    async edit_post (postID , title_in, author_in, summary_in, rating_in, premium_content, ingredients_in, instructions_in){
        await postDM.update_title(title_in, postID);
        await postDM.update_summary(summary_in, postID);
        await postDM.update_premium_content(premium_content, postID);
        await postDM.update_ingredients(ingredients_in, postID);
        await postDM.update_instruct(instructions_in, postID);
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




    // edit all features of posts, apart from id
    // size restrictions, title (64), summary (150), ingredients (200), instructions (2000)
    // Delete Posts
    // Get Posts
    // Check content against SQL injection or CSS.
    //
}
export default new postController;