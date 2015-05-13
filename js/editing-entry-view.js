(function(window, document, undefined) {
  var EditingEntryView = {};

  /* Renders a view to allow the user to edit an entry. Requires the $entry
   * element and an object representing the active entry. */
  EditingEntryView.render = function($entry, activeEntryData) {
    var entryRenderer = Handlebars.compile($("#entry-template").html());
    $entry.html(entryRenderer({
    	editing: true,
    	entries: null,
    	activeEntryData: activeEntryData
    }));
    $('.update',$entry).click(function(e){
    	EntryModel.update({
    		id: activeEntryData.id,
    		address: $('input[name=address]',$entry).val(),
			name: $('input[name=name]',$entry).val(),
			description: $('textarea[name=description]',$entry).val()
    	}, function(error,entry){
    		if(error) $('.error',$entry).text(error);
    		else EntryView.render($entry,entry);
    	});
    });
  };

  window.EditingEntryView = EditingEntryView;
})(this, this.document);
