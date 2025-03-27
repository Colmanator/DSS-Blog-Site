import {query} from "express";

class postDataManager {
//id, title, author, summary, rating, premium content, ingredients, instructions.
    async get_all(client){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts")
        await client.end()
        return result;
    }

    async get_postByID(idIn){
        await client.connect();
        let query = "SELECT * FROM posts WHERE id = $1";
        let params = [idIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_postByTitle(titleIn){
        await client.connect();
        let query = "SELECT * FROM posts WHERE title = $1";
        let params = [titleIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_postsByAuthor(authorIn){
        await client.connect();
        let query = "SELECT * FROM posts WHERE author_email = $1";
        let params = [authorIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_postsByStatus(statusIn){
        await client.connect();
        let query = "SELECT * FROM posts WHERE premium_content = $1";
        let params = [statusIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    //-----------------------------------------------------------------------------------------------------------------
    async get_postsByRating(ratingIn){
        await client.connect();
        let query = "SELECT * FROM posts WHERE rating = $1";
        let params = [ratingIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    //This is fine, but what may be more useful is a method that gets all reviews above/below a certain rating?

    async get_postsAboveRating(ratingIn){
        await client.connect();
        let query = "SELECT * FROM posts WHERE rating > $1";
        let params = [ratingIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }
    //-----------------------------------------------------------------------------------------------------------------

    //=================================================================================================================

    async update_title(titleIn, idIn){
        await client.connect();
        let query = "UPDATE posts SET title = $1 WHERE id = $2 ";
        let params = [titleIn, idIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async update_summary(summaryIn, idIn){
        await client.connect();
        let query = "UPDATE posts SET summary = $1 WHERE id = $2";
        let params = [summaryIn, idIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async update_rating(ratingIn, idIn){
        await client.connect();
        let query = "UPDATE posts SET rating = $1 WHERE id = $2 ";
        let params = [ratingIn, idIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async update_premium_content(statusIn, idIn){
        await client.connect();
        let query = "UPDATE posts SET premium_content = $1 WHERE id = $2";
        let params = [statusIn, idIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async update_ingredients(ingredientsIn, idIn){
        await client.connect();
        let query = "UPDATE posts SET ingredients = $1 WHERE id = $2";
        let params = [ingredientsIn, idIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async update_instruct(instructIn, idIn){
        await client.connect();
        let query = "UPDATE posts SET instructions = $1 WHERE id = $2";
        let params = [instructIn, idIn]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    // I'm dubious whether the parameter substitution would work as intended - unless this is more js magic that im unfamiliar with
    //-------------------------
    async create_post(titleIn, authorIn, summaryIn, premiumContentIn, ingredientsIn, instructIn){
        await client.connect();
        let query = "INSERT INTO posts(id, title, author, summary, rating, premiumContent, ingredients, instructions) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7)";
        let params = [titleIn, authorIn, summaryIn, 0, premiumContentIn, ingredientsIn, instructIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async deletePost(postId){
        await client.connect();
        let query = "DELETE FROM posts WHERE id = $1";
        let params = [postId]
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }


}
export default new postDataManager;