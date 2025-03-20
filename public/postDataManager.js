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
        const result = await client.query("SELECT * FROM posts WHERE author = [0]", authorIn)
        await client.end()
        return result;
    }

    async get_postsByStatus(client, statusIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE premiumStatus = [0]", statusIn)
        await client.end()
        return result;
    }

    async get_postsByRating(client, ratingIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM posts WHERE rating = [0]", ratingIn)
        await client.end()
        return result;
    }

    async update_title(client, titleIn, idIn){
        await client.connect();
        const result = await client.query("UPDATE posts SET title = [0] WHERE id = [1] ", titleIn, idIn);
        await client.end();
        return result;
    }

    async update_summary(client, summaryIn, idIn){
        await client.connect();
        const result = await client.query("UPDATE posts SET summary = [0] WHERE id = [1] ", summaryIn, idIn);
        await client.end();
        return result;
    }

    async update_rating(client, ratingIn, idIn){
        await client.connect();
        const result = await client.query("UPDATE posts SET rating = [0] WHERE id = [1] ", ratingIn, idIn);
        await client.end();
        return result;
    }

    async update_status(client, statusIn, idIn){
        await client.connect();
        const result = await client.query("UPDATE posts SET premiumContent = [0] WHERE id = [1] ", statusIn, idIn);
        await client.end();
        return result;
    }

    async update_ingredients(client, ingredientsIn, idIn){
        await client.connect();
        const result = await client.query("UPDATE posts SET ingredients = [0] WHERE id = [1] ", ingredIn, idIn);
        await client.end();
        return result;
    }

    async update_instruct(client, instructIn, idIn){
        await client.connect();
        const result = await client.query("UPDATE posts SET instructions = [0] WHERE id = [1] ", instructIn, idIn);
        await client.end();
        return result;
    }

    async create_postInDatabase(client, titleIn, authorIn, summaryIn, premiumContentIn, ingredientsIn, instructIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("INSERT INTO posts(id, title, author, summary, rating, premiumContent, ingredients, instructions) VALUES([0], [1], [2], [3], [4], [5], [6])",titleIn, authorIn,summaryIn, 0, premiumContentIn, ingredientsIn, instructIn);
        await client.end()
        return result;
    }

    async deletePost(client, postId){
        await client.connect();
        const result = await client.query("DELETE FROM posts WHERE id = [0]", postId)
        await client.end();
        return result;
    }


}
export default new postDataManager;