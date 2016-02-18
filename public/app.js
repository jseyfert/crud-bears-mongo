
//remove a bear
var killBear = function() {
	var id = $(event.target).closest('tr').attr('id');	
	var bear= $(event.target).closest('tr');	

	$.ajax({
		url: '/api/bears/' + id, 
		method: 'DELETE' ,
	}).done(function(){
		bear.remove();
	});
};


// add a bear
var addBear = function(event) {
	event.preventDefault();
	
	var name = $('#name').val();
	var age = $('#age').val();
	var gender = $('#gender').val();
	var $table = $('#bearTable');

	var bear = {};
	bear.name = name;
	bear.age = age;
	bear.gender = gender;

	if (name && age && gender){

		$.ajax({
			url: '/api/bears/', 
			method: 'POST',
			data: bear
		}).done(function(data){
			$table.append(
			    '<tr id="' + data._id + '"> \
				<td>' + data.name + '</td>\
				<td>' + data.age + '</td>\
				<td>' + data.gender + '</td>\
				<td><button class="killBear" type="button" class="btn btn-primary">Kill Bear</button></td></tr>\
			');
		clearInput($('#name'));
		clearInput($('#age'));
		clearInput($('#gender'));

		$('.killBear').on('click', killBear);
		});
	}
};


//clear inputs
function clearInput ($input) {
	$input.val("");
}

//buttons
$('#addBear').on('click', addBear);
$('.killBear').on('click', killBear);