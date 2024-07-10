$(document).ready(function() {
    function fetchPatientDetails() {
        $.ajax({
            url: 'index.php?action=getPatientDetails',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var tableBody = $('#patientDetails tbody');
                tableBody.empty();
                $.each(data.data, function(index, patient) {
                    var $row = $('<tr>').append(
                        $('<td>').text(patient.SubmissionDate),
                        $('<td>').text(patient.FirstName),
                        $('<td>').text(patient.Surname),
                        $('<td>').text(patient.Age),
                        $('<td>').text(patient.DateOfBirth),
                        $('<td>').text(patient.TotalScore)
                    );
                    $row.data('patient-id', patient.ID);
                    tableBody.append($row);
                });
            },
            error: function(xhr, status, error) {
                $('#error-message').text(error);
            }
        });
    }
    fetchPatientDetails();

    function getAllPatientDetails(patientId) {
        $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {action: 'fetchPatientDetails', patientId: patientId},
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    $('#firstName').val(response.data.FirstName);
                    $('#surname').val(response.data.Surname);
                    $('#treatment').val(response.data.ReliefPainTreatments);
                    $('#worst').val(response.data.PainWorst);
                    $('#least').val(response.data.PainLeast);
                    $('#average').val(response.data.PainAverage);
                    $('#now').val(response.data.PainRightNow);
                    $('#activity').val(response.data.PainInterferedGeneralActivity);
                    $('#mood').val(response.data.PainInterferedMood);
                    $('#walking').val(response.data.PainInterferedWalkingAbility);
                    $('#work').val(response.data.PainInterferedNormalWork);
                    $('#relationships').val(response.data.PainInterferedRelationships);
                    $('#sleep').val(response.data.PainInterferedSleep);
                    $('#enjoyment').val(response.data.PainInterferedEnjoymentOfLife);

                    $('#patientForm').data('patient-id', patientId);
                    $('#patientDetailsForm').removeClass('d-none').show();
                } else {
                    alert('Error fetching details');
                }
            }
        });
    }

    $('#patientDetails tbody').on('click', 'tr', function() {
        var patientId = $(this).data('patient-id');
        getAllPatientDetails(patientId);
    });

    $('#editBtn').click(function() {
        $('input').removeAttr('readonly');
        $('#updateBtn').removeClass('d-none');
    });

    $('#deleteBtn').click(function() {
        var patientId = $('#patientForm').data('patient-id');
        if (confirm('Are you sure you want to delete this record?')) {
            $.ajax({
                url: 'index.php',
                type: 'POST',
                data: {action: 'deletePatient', patientId: patientId},
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        alert('Record deleted successfully');
                        $('#patientDetailsForm').hide();
                    } else {
                        alert('Error deleting record');
                    }
                }
            });
        }
    });

    $('#updateBtn').click(function() {
        var patientId = $('#patientForm').data('patient-id');
        var updatedDetails = {
            firstName: $('#firstName').val().trim(),
            surname: $('#surname').val().trim(),
            treatment: parseInt($('#treatment').val(), 10),
            worst: parseInt($('#worst').val(), 10),
            least: parseInt($('#least').val(), 10),
            average: parseInt($('#average').val(), 10),
            now: parseInt($('#now').val(), 10),
            activity: parseInt($('#activity').val(), 10),
            mood: parseInt($('#mood').val(), 10),
            walking: parseInt($('#walking').val(), 10),
            work: parseInt($('#work').val(), 10),
            relationships: parseInt($('#relationships').val(), 10),
            sleep: parseInt($('#sleep').val(), 10),
            enjoyment: parseInt($('#enjoyment').val(), 10)
        };

        $.ajax({
            url: 'index.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                action: 'updatePatient',
                patientId: patientId,
                updatedDetails: updatedDetails
            }),
            success: function(response) {
                if (response.status === 'success') {
                    fetchPatientDetails();
                    $('#success-msg').text('Record updated successfully').removeClass('d-none').delay(4000).fadeOut();
                    $('#patientDetailsForm').hide();
                    $('input').attr('readonly', true);
                } else {
                    $('#error-msg').text('Error updating record').removeClass('d-none');
                }
            }
        });
    });
});