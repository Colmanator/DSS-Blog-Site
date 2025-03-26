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
        let query = "SELECT * FROM reviews WHERE id = $1";
        let params = [idIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_reviewsByAuthor(client, authorIn){
        await client.connect();
        let query = "SELECT * FROM reviews WHERE author = $1";
        let params = [authorIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_reviewsByPost(client, postIn){
        await client.connect();
        let query = "SELECT * FROM reviews WHERE post = $1";
        let params = [postIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_reviewByRating(client, ratingIn){
        await client.connect();
        let query = "SELECT * FROM reviews WHERE rating = $1";
        let params = [ratingIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async get_reviewByComment(client, commentIn){
        await client.connect();
        let query = "SELECT * FROM reviews WHERE comment = $1";
        let params = [commentIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async update_rating(client, ratingIn, idIn){
        await client.connect();
        let query = "UPDATE reviews SET rating = $1 WHERE id = $2";
        let params = [ratingIn, idIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async update_comment(client, commentIn, idIn ){
        await client.connect();
        let query = "UPDATE reviews SET comment = $1 WHERE id = $2";
        let params = [commentIn, idIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }

    async create_reviewInDatabase(client, authorIn, postIn, ratingIn, commentIn){

        await client.connect();
        let query = "INSERT INTO reviews(id, author, post, rating, comment) VALUES(DEFAULT, $1, $2, $3, $4)";
        let params = [authorIn, postIn, ratingIn, commentIn];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end()
        return result;
    }

    async deleteReview(client, reviewId){
        await client.connect();
        let query = "DELETE FROM reviews WHERE id = $1";
        let params = [reviewId];
        await client.query("SET SEARCH_PATH TO dss_cw; SET DATESTYLE TO \'ISO, DMY\'"); //Date format set
        const result = await client.query(query, params);
        await client.end();
        return result;
    }


}
export default new ReviewDataManager;