$(document).ready(function() {
  function getQuote() {
    $.ajax({
      url: "https://quotesondesign.com/wp-json/wp/v2/posts?orderby=rand&filter",
      type: "GET",
      dataType: "json",
      success: function(data) {
        var { content: { rendered: quote }, title: { rendered: author } } = data[0];
        quote = quote.replace(/<\/*p>/gi, '');
        quoteHistory.push({ quote, author });
        currQuoteIndex = quoteHistory.length - 1;
        displayQuote(quote, author);
        // $newBtn.show();
        $nextBtn.show();
        showButtons();
      },
      cache: false
    });
  }

  function displayQuote(quote, author) {
    var html = `<i class="fa fa-quote-left fa-1x" aria-hidden="true"></i>
    ${quote}<i class="fa fa-quote-right fa-1x" aria-hidden="true"></i>
    <br><br>-- ${author}
    `;
    $(".quote").html(html);
    // $("#anchorDiv").attr("href", "https://twitter.com/intent/tweet?text=" + quote);
    // $("#anchorDiv").html("Tweet");
  }

  function showButtons() {
      if (quoteHistory.length > 1 && currQuoteIndex > 0) $prevBtn.show();
      else $prevBtn.hide();
  }
  
  function prevNext() {
    var direction = $(this).hasClass("previous") ? -1 : 1;
    if (direction > 0 && currQuoteIndex === quoteHistory.length - 1) {
      getQuote();
      return;
    }
    currQuoteIndex += direction
    var { quote, author } = quoteHistory[currQuoteIndex];
    displayQuote(quote, author);
    showButtons();
  }

  $newBtn = $(".new");
  $prevBtn = $(".previous");
  $nextBtn = $(".next");
  var quoteHistory = [];
  var currQuoteIndex;
  getQuote();
  
  $(".new").on("click", getQuote);
  $(".previous, .next").on("click", prevNext);
});