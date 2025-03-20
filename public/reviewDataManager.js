class ReviewDataManager {
// id, author, post, rating, comment.
    async get_all(client){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM reviews")
        await client.end()
        return result;
    }

    async get_reviewByID(client, idIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM reviews WHERE id = [0]", idIn)
        await client.end()
        return result;
    }

    async get_reviewsByAuthor(client, authorIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM reviews WHERE author = [0]", authorIn)
        await client.end()
        return result;
    }

    async get_reviewsByPost(client, postIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM reviews WHERE post = [0]", postIn)
        await client.end()
        return result;
    }

    async get_reviewByRating(client, ratingIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM reviews WHERE rating = [0]", ratingIn)
        await client.end()
        return result;
    }

    async get_reviewByComment(client, commentIn){
        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("SELECT * FROM reviews WHERE comment = [0]", commentIn)
        await client.end()
        return result;
    }

    async update_rating(client, ratingIn, idIn){
        await client.connect();
        const result = await client.query("UPDATE reviews SET rating = [0] WHERE id = [1] ", ratingIn, idIn);
        await client.end();
        return result;
    }

    async update_comment(client, commentIn, idIn ){
        await client.connect();
        const result = await client.query("UPDATE reviews SET comment = [0] WHERE id = [1] ", commentIn, idIn);
        await client.end();
        return result;
    }

    async create_postInDatabase(client, authorIn, postIn, ratingIn, commentIn){

        await client.connect();
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query("INSERT INTO posts(id, author, post, rating, comment) VALUES([0], [1], [2], [3])",authorIn, postIn, ratingIn, commentIn);
        await client.end()
        return result;
    }

    async deletePost(client, reviewId){
        await client.connect();
        const result = await client.query("DELETE FROM reviews WHERE id = [0]", reviewId)
        await client.end();
        return result;
    }


}
export default new ReviewDataManager;