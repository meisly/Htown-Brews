module.exports = function (db) {
    this.searchBeers = async (keyword, callback) => {
        results = await db.beers.findall({
            where: {
                beer_name: { $like: keyword }
            }
        });
        console.table(results);
    },
        /*will calculate the average rating of the beer by taking the review scores from the reviews table
        and calcing their average*/
    this.beerReviews = async (beerName) => {
            //lists reviews where review_beer = beerName
    },
    this.addReview = async (reviewObj) => {
        //add review to table
        let result = await db.reviews.create({
            review_rating: reviewObj.rating,
            review_paragraph: reviewObj.paragraph
        });
    },
    this.userReviews = async (user) => {
        //lists reviews where review_author = user
    },
//***************************************************password validation**************************************************** */
    this.genRandomString = (length) => { //makes the hash salt
        return crypto.randomBytes(Math.ceil(length / 2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0, length); /** return required number of characters */
    },
    this.sha512 = (password, salt)=>{
        let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    },
    this.hashIt = async (newUser) => { //hashes the password then stores user values and salt in DB
        let Salt = this.genRandomString(16); /** Gives us salt of length 16 */
        let passwordData = this.sha512(newUser.username,newUser.password, Salt);
        let result = await db.users.create({
            username: newUser.username,
            email: newUser.email,
            role:'guest',
            password: passwordData,
            salt: Salt
        });
        if(result){
            console.log('user added');
        }else{
            console.log('err');
        }
        
    }

}