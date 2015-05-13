(function(window, document, undefined) {
  var EntryView = {};

  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = function($entry, activeEntryData) {
  	var entryRenderer = Handlebars.compile($("#entry-template").html());
  	EntryModel.loadAll(function(error,entries){
  		if(error | !entries){
  			if(error) $('.error',$entry).text(error);
  			CreatingEntryView.render($entry);
  		}else{
  			if(!activeEntryData){
  				activeEntryData = entries[0];
  			}
	  		$entry.html(entryRenderer({
				viewing: true,
				entries: entries,
				activeEntryData: activeEntryData
		  	}));
		  	$('.new',$entry).click(function(e){
		  		CreatingEntryView.render($entry);
		  	});
		  	$('.edit',$entry).click(function(e){
		  		EditingEntryView.render($entry,activeEntryData);
		  	});
		  	$('.delete',$entry).click(function(e){
		  		EntryModel.remove(activeEntryData.id,function(error){
		  			if(error) $('.error',$entry).text(error);
		  			else EntryView.render($entry,null);
		  		});
		  	});
		  	$('select',$entry).change(function(e){
		  		var $select = $('select',$entry);
		  		EntryView.render($entry,entries.filter(function(fe){
		  			return fe.id == $select.val();
		  		})[0]);
		  	});
		  	GoogleMapView.render($('.map',$entry),activeEntryData);
		}
  	});
  };

  window.EntryView = EntryView;
})(this, this.document);
