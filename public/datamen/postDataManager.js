class postDataManager {
//id, title, author, summary, rating, premium content, ingredients, instructions.
    async get_all(client){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts")
        await client.end()
        return result;
    }

    async get_postByID(client, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE id = [0]", idIn)
        await client.end()
        return result;
    }

    async get_postByTitle(client, titleIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE title = [0]", titleIn);
        await client.end()
        return result;
    }

    async get_postsByAuthor(client, authorIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE author_email = [0]", authorIn)
        await client.end()
        return result;
    }

    async get_postsByStatus(client, statusIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE premium_content = [0]", statusIn)
        await client.end()
        return result;
    }

    //-----------------------------------------------------------------------------------------------------------------
    async get_postsByRating(client, ratingIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE rating = [0]", ratingIn)
        await client.end()
        return result;
    }

    //This is fine, but what may be more useful is a method that gets all reviews above/below a certain rating?

    async get_postsAboveRating(client, ratingIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE rating > [0]", ratingIn)
        await client.end()
        return result;
    }
    //-----------------------------------------------------------------------------------------------------------------

    //=================================================================================================================

    async update_title(client, titleIn, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE posts SET title = [0] WHERE id = [1] ", titleIn, idIn);
        await client.end();
        return result;
    }

    async update_summary(client, summaryIn, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE posts SET summary = [0] WHERE id = [1] ", summaryIn, idIn);
        await client.end();
        return result;
    }

    async update_rating(client, ratingIn, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE posts SET rating = [0] WHERE id = [1] ", ratingIn, idIn);
        await client.end();
        return result;
    }

    async update_premium_content(client, statusIn, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE posts SET premium_content = [0] WHERE id = [1] ", statusIn, idIn);
        await client.end();
        return result;
    }

    async update_ingredients(client, ingredientsIn, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE posts SET ingredients = [0] WHERE id = [1] ", ingredIn, idIn);
        await client.end();
        return result;
    }

    async update_instruct(client, instructIn, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("UPDATE posts SET instructions = [0] WHERE id = [1] ", instructIn, idIn);
        await client.end();
        return result;
    }

    // I'm dubious whether the parameter substitution would work as intended - unless this is more js magic that im unfamiliar with
    //-------------------------
    async create_post(client, titleIn, authorIn, summaryIn, premiumContentIn, ingredientsIn, instructIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("INSERT INTO posts(id, title, author, summary, rating, premiumContent, ingredients, instructions) VALUES([0], [1], [2], [3], [4], [5], [6])",titleIn, authorIn,summaryIn, 0, premiumContentIn, ingredientsIn, instructIn);
        await client.end()
        return result;
    }

    //uncertain if this works
    async create_post(client, titleIn, authorIn, summaryIn, premiumContentIn, ingredientsIn, instructIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const query = "INSERT INTO posts(id, title, author_email, summary, rating, premium_content, ingredients, instructions) VALUES(DEFAULT, $0, $1, $2, $3, $4, $5)";
        const params = [titleIn, authorIn, summaryIn, 0, premiumContentIn, ingredientsIn, instructIn]
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async deletePost(client, postId){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("DELETE FROM posts WHERE id = [0]", postId)
        await client.end();
        return result;
    }


}
export default new postDataManager;