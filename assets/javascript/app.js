//"https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5fbaeac9151c497d85989bf7b9586bb9&q=trump&begin_date=20170101&end_date=20180110"


var searchTerm = "";
var startYear = "1990";
var endYear = "2018";


// When the search button is pressed check if there is any input/value in fields, store the value in individual variables
$("#btn1").on("click", function (event) {
     event.preventDefault();
    searchTerm = $("#searchTerm").val().trim();
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();

// call the function searchArticle and pass in the variables that holds the value of search
    searchArticle(searchTerm,startYear,endYear);

});

//this is the function that does the full search and returns articles
function searchArticle(searchTerm, startYear, endYear) {

// store the query in a var, for each search search term start year and end year is passed in to the query
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5fbaeac9151c497d85989bf7b9586bb9&q=" + searchTerm + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1231"

//empty any previous atricles in html element that hold articles
    $("#searchResults").empty();

//do ajax call wit the url that we created in var urlQuery
    $.ajax({
        meethod: "GET",
        url: queryURL
    }).then(function (data) {
        //store the object in var result
        var result = data.response.docs;
        //for each item in array do this loop
        for (var i = 0; i < result.length; i++) {
            //create a div with class article
            var newsDiv = $("<div class='article'>");
            //create a headline with text from the results array
            var headline = $("<h4>").text(result[i].headline.main);
            //create a p tag with the authurs name
            var by = $("<p>").text("Author: " + result[i].byline.original);
            //create a p tag with the catefory of article
            var section = $("<p>").text("Category: " + result[i].section_name);
            // create a p tag with publish date
            var publishDate = $("<p>").text("Publish date: " + result[i].pub_date);
            //create a link with the url to article on org site
            var url = $("<a id='link'>").attr("href", result[i].web_url).text(result[i].web_url);

            //append the headline, by, section, publishdate and url to the div we created newsDiv
            newsDiv.append(headline, by, section, publishDate, url);
            //append the newsDiv that now contains all the other tags to an exsisting html element 
            $("#searchResults").append(newsDiv);
        }
    });

}

