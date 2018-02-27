//"https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5fbaeac9151c497d85989bf7b9586bb9&q=trump&begin_date=20170101&end_date=20180110"


var searchTerm = "trump" ;
var startYear = "1990";
var endYear = "2018";

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5fbaeac9151c497d85989bf7b9586bb9&q=" + searchTerm + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1231"



$.ajax({
    meethod: "GET",
    url: queryURL
    }).then(function(data){
        var result = data.response.docs;
        for (var i = 0; i < result.length; i++){
            var newsDiv = $("<div class='article'>");
            var headline = $("<h4>").text(result[i].headline.main);
            var by = $("<p>").text("Author: " + result[i].byline.original);
            var section = $("<p>").text("Category: " + result[i].section_name);
            var publishDate = $("<p>").text("Publish date: " + result[i].pub_date);
            var url = $("<a>").append("href='" + result[i].web_url+ "'") ;

            newsDiv.append(headline, by, section, publishDate, url);
            
            $("#searchResults").append(newsDiv);
        }
    });

    


console.log(queryURL)