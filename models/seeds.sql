
USE project;
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Oktoberfest", "Festival Beer", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Art Car", "IPA", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Elissa", "IPA", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Fancy Lawnmover", "German-Style Kolsch", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Daydream", "Session", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Santo", "Black Kolsch", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Orange Show", "Blonde Ale", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("5 O'Clock Pils", "Lager", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Amber Ale", "Ale", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Ale Wagger", "Ale", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Guten Tag", "Bavarian-Style Lager", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Pub Crawl", "Pale Ale", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Citrodos", "IPA", "Yum", "Saint Arnold");
INSERT INTO beers (beer_name, beer_type, beer_description, brewrey) VALUES ("Raspberry AF", "Berliner Weisse", "Yum", "Saint Arnold");

USE project;
INSERT INTO reviews (reviewRating, reviewParagraph, beerId, userId) VALUES (4, "It was yummy", 1, 1);
INSERT INTO reviews (reviewRating, reviewParagraph, beerId, userId) VALUES (2, "It was yucky", 2, 1);
INSERT INTO reviews (reviewRating, reviewParagraph, beerId, userId) VALUES (3, "It was ok", 1, 2);
INSERT INTO reviews (reviewRating, reviewParagraph, beerId, userId) VALUES (1, "It was gross", 3, 1);