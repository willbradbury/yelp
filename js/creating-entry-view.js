(function(window, document, undefined) {
  var CreatingEntryView = {};

  /* Renders a view to allow the user to create an entry. Requires the $entry
   * element. */
  CreatingEntryView.render = function($entry) {
    var entryRenderer = Handlebars.compile($("#entry-template").html());
    $entry.html(entryRenderer({
    	creating: true,
    	entries: null,
    	activeEntryData: null
    }));
    $('.add',$entry).click(function(e){
    	EntryModel.add({
    		address: $('input[name=address]',$entry).val(),
			name: $('input[name=name]',$entry).val(),
			description: $('textarea[name=description]',$entry).val()
    	}, function(error,entry){
    		if(error) $('.error',$entry).text(error);
    		else EntryView.render($entry,entry);
    	});
    });
  };

  window.CreatingEntryView = CreatingEntryView;
})(this, this.document);
