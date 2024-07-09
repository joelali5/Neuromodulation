$(document).ready(function() {
    function fetchPatientDetails() {
        $.ajax({
            url: 'index.php?action=getPatientDetails',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data);
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
                alert("Failed to fetch patient data: " + error);
            }
        });
    }
    fetchPatientDetails();

    // function getAllPatientDetails(patientId) {
    //     $.ajax({
    //         url: 'index.php',
    //         type: 'GET',
    //         data: {action: 'fetchPatientDetails', patientId: patientId},
    //         dataType: 'json',
    //         success: function(response) {
    //             if (response.status === 'success') {
    //                 $('#firstName').val(response.data.FirstName);
    //                 $('#surname').val(response.data.Surname);
    //                 $('#treatment').val(response.data.treatment);
    //                 $('#worst').val(response.data.worst);
    //                 $('#least').val(response.data.least);
    //                 $('#now').val(response.data.now);
    //                 $('#activity').val(response.data.activity);
    //                 $('#mood').val(response.data.mood);
    //                 $('#walking').val(response.data.walking);
    //                 $('#work').val(response.data.work);
    //                 $('#relationships').val(response.data.relationships);
    //                 $('#sleep').val(response.data.sleep);
    //                 $('#enjoyment').val(response.data.enjoyment);

    //                 $('#patientForm').data('patient-id', patientId);
    //                 $('#patientDetailsForm').removeClass('d-none').show();
    //             } else {
    //                 alert('Error fetching details');
    //             }
    //         }
    //     });
    // }

    // $('#patientDetails tbody').on('click', 'tr', function() {
    //     var patientId = $(this).data('patient-id');
    //     getAllPatientDetails(patientId);
    // });

    // $('#editBtn').click(function() {
    //     $('input').removeAttr('readonly');
    // });

    // $('#deleteBtn').click(function() {
    //     var patientId = $('#patientForm').data('patient-id');
    //     if (confirm('Are you sure you want to delete this record?')) {
    //         $.ajax({
    //             url: 'index.php',
    //             type: 'POST',
    //             data: {action: 'deletePatient', patientId: patientId},
    //             dataType: 'json',
    //             success: function(response) {
    //                 if (response.status === 'success') {
    //                     alert('Record deleted successfully');
    //                     $('#patientDetailsForm').hide();
    //                 } else {
    //                     alert('Error deleting record');
    //                 }
    //             }
    //         });
    //     }
    // });
});