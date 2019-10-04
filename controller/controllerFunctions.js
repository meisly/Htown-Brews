    this.searchBeers = async (keyword, callback) =>{
        results = await db.beers.findall({where: {
                beer_name:{$like: keyword}
            }
        });
        console.table(results);
    },
        /*will calculate the average rating of the beer by taking the review scores from the reviews table
        and calcing their average*/ 
    this.beerReviews = async (beerName) =>{
        //lists reviews where review_beer = beerName
    },
    this.addReview = async (reviewObj) =>{
        //add review to table
        let result = await db.reviews.create({
            review_rating: reviewObj.rating,
            review_paragraph: reviewObj.paragraph
        });
    }
    this.userReviews = async (user) =>{
        //lists reviews where review_author = user
    }


}