jQuery(document).ready(function(){
	
	var db;
	var openRequest = indexedDB.open('notes', 1);
	openRequest.onupgradeneeded = function(e){
		var thisDB = e.target.result;
		if(!thisDB.objectStoreNames.contains('notestore')) {
			thisDB.createObjectStore('notestore', { autoIncrement : true });
		}
	};

	function Note(subject, message, name){
		this.subject = subject;
		this.message = message;
		this.name = name;
		this.date = new Date();
	}


	openRequest.onsuccess = function(e){
		console.log('Open Success!');
		db = e.target.result;
		$('#add-note-btn').click(function(e){


			var subjectInput = $("#subject-input").val();
			var messageInput = $("#message-input").val();
			var nameInput = $("#name-input").val();
			if(!validateInputs(subjectInput,messageInput,nameInput)){
				alert('No field can be blank!');
			}else{
				var encodedSubject = encodeInput($('#subject-input'));
				var encodedMessage = encodeInput($('#message-input'));
				var encodedName = encodeInput($('#name-input'));
				addNote(new Note(encodedSubject,encodedMessage,encodedName));
				$('#subject-input').val('');
				$('#message-input').val('');
				$('#name-input').val('');
			}
		});
		console.log("Read firstly");
		readList();
	};

	openRequest.onerror = function(e) {
		console.log('Open Error!');
		console.dir(e);
	}


	function addNote(note){
		var transaction = db.transaction(['notestore'],'readwrite');
		var store = transaction.objectStore('notestore');
		var addRequest = store.add(note);
		addRequest.onerror = function(e) {
			console.log("Error adding", e.target.error.name);
	    }
	    addRequest.onsuccess = function(e) {
	    	console.log('succesfuly inserted');
	    	readList();   	
	    }
	}

	function readList(){
		console.log("How many times being called");
		$('#table-wrapper').empty();
		$('#table-wrapper').append('<h1></h1>');
		$('#table-wrapper').append('<table id="myTable" class="table table-bordered table-striped"><thead><th>Subject</th><th>Date</th><th>Msg characters</th><th>Edit</th><th>Delete</th></thead></table>');
		//Count Objects
		var transaction = db.transaction(['notestore'], 'readonly');
		var store = transaction.objectStore('notestore');
		var countRequest = store.count();

		var $tBody = $('<tbody>');
		$('#table-wrapper table').append($tBody);

		countRequest.onsuccess = function(){
			count = Number(countRequest.result);
			// Get all Objects and display if contacts exist
			if (count > 0) {
				var objectStore = db.transaction(['notestore'], 'readonly').objectStore('notestore');
				objectStore.openCursor().onsuccess = function(e){
					var cursor = e.target.result;
					if (cursor) {
						var $row = $('<tr>');
						var key = cursor.key
						var subject =cursor.value.subject;
						var $subjectCol = $('<td></td>').append(subject);
						var messageCharacters = cursor.value.message.length;

						//Format date for list
						var dateFormatted = formatDate(cursor.value.date);

						var $dateCol = $('<td></td>').append(dateFormatted);

						var $charactersCol = $('<td></td>').append(messageCharacters);
						var $editCol = $('<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
						$editCol.find('button').click(function(){
							loadByKey(Number(key));
						});
						var $deleteCol = $('<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>');
						$deleteCol.find('button').click(function(){
							confirmDelete(key);
						});

						$row.append($subjectCol);
						$row.append($dateCol);
						$row.append($charactersCol);
						$row.append($editCol);
						$row.append($deleteCol);
						$tBody.append($row);
						cursor.continue();
					}
					else {
					    //no more entries
					    console.log('no more entries');
					    $('#table-wrapper h1').html('Total notes number: ' + count);
					}
				};

			} else {
				$('#table-wrapper').empty();
				$('#table-wrapper').html('<h3>No Contacts to show!</h3>');
			}
		};
	}



	function validateInputs(subjectInput,messageInput,nameInput){
		if(!subjectInput.trim() || !messageInput.trim() || !nameInput.trim()){
			return false;
		}
		return true;
	}

	function loadByKey(key){
		var transaction = db.transaction(['notestore'], 'readonly');
		var store = transaction.objectStore('notestore');
		var request = store.get(key);

		request.onerror = function(e) {
		  // Handle errors!
		};
		request.onsuccess = function(e) {
			// Do something with the request.result!
			$('#subject-detail').val(request.result.subject);
			$('#message-detail').val(request.result.message);
			$('#name-detail').val(request.result.name);
			$('#btn-edit-note').click(function(){
				updateNote(key);
			});

			$('#btn-edit-delete').click(function(){
				deleteNote(key);
			});
		}
	}

	function updateNote(key){
		var subject = encodeInput($('#subject-detail'));
		var message = encodeInput($('#message-detail'));
		var name = encodeInput($('#name-detail'));

		if(!validateInputs(subject,message,name)){
				$("#update-empty").show();
		}else{
			var note = new Note(subject,message,name);
			var transaction = db.transaction(['notestore'], 'readwrite');
			var store = transaction.objectStore('notestore');
			var request = store.put(note, key);
			$("#update-empty").hide();
			removeModal();
			readList();
		}
	}

	function confirmDelete(key) {
		$("#btn-yes-remove").click(function(){
			deleteNote(key);
			readList();
		});
	}

	function deleteNote(key){
		var transaction = db.transaction(['notestore'], 'readwrite');
	 	var store = transaction.objectStore('notestore');
		var request = store.delete(key);
		request.onsuccess = function(e){
			removeModal();
			readList();
		};
	}


	/******Helper Functions********/

	function formatDate(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";

    	return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
            minuteFormatted + morning;
	}

	function encodeInput($input){
		var text = $input.val();
		var yourTextHTML = $('<span></span>').text(text).html();
		return yourTextHTML;
	}

	function removeModal(){
		$('.modal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
	}
    /******Helper Functions********/
	

	$("[data-toggle=tooltip]").tooltip();




});

