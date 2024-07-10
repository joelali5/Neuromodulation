$(document).ready(function() {
    let patientData = [];

    function fetchPatientDetails() {
        $.ajax({
            url: 'index.php?action=getPatientDetails',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                patientData = data.data;
                renderTable(patientData);
            },
            error: function(xhr, status, error) {
                $('#error-message').text(error).removeClass('d-none');
            }
        });
    }

    function renderTable(data) {
        var tableBody = $('#patientDetails tbody');
        tableBody.empty();
        $.each(data, function(index, patient) {
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
    }

    $('#filterByFirstName').on('input', function() {
        var filterValue = $(this).val().toLowerCase();
        var filteredData = patientData.filter(function(patient) {
            return patient.FirstName.toLowerCase().includes(filterValue);
        });
        renderTable(filteredData);
    });

    $('#filterBySurname').on('input', function() {
        var filterValue = $(this).val().toLowerCase();
        var filteredData = patientData.filter(function(patient) {
            return patient.Surname.toLowerCase().includes(filterValue);
        });
        renderTable(filteredData);
    });

    $('#filterByDateOfBirth').on('input', function() {
        var filterValue = $(this).val();
        var filteredData = patientData.filter(function(patient) {
            return patient.DateOfBirth.includes(filterValue);
        });
        renderTable(filteredData);
    });

    $('#clearFilters').click(function() {
        $('#filterFirstName').val('');
        $('#filterSurname').val('');
        $('#filterDateOfBirth').val('');
        renderTable(patientData);
    });

    function sortTable(column, order) {
        var sortedData = patientData.sort(function(a, b) {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        renderTable(sortedData);
    }

    $('#sortByFirstName').click(function() {
        sortTable('FirstName', 'asc');
    });

    $('#sortBySurname').click(function() {
        sortTable('Surname', 'asc');
    });

    $('#sortByAge').click(function() {
        sortTable('Age', 'asc');
    });

    $('#sortByTotalScore').click(function() {
        sortTable('TotalScore', 'asc');
    });

    function getAllPatientDetails(patientId) {
        $.ajax({
            url: 'index.php',
            type: 'GET',
            data: {action: 'fetchPatientDetails', patientId: patientId},
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    var data = response.data;
                    $('#firstName').val(data.FirstName);
                    $('#surname').val(data.Surname);
                    $('#treatment').val(data.ReliefPainTreatments);
                    $('#worst').val(data.PainWorst);
                    $('#least').val(data.PainLeast);
                    $('#average').val(data.PainAverage);
                    $('#now').val(data.PainRightNow);
                    $('#activity').val(data.PainInterferedGeneralActivity);
                    $('#mood').val(data.PainInterferedMood);
                    $('#walking').val(data.PainInterferedWalkingAbility);
                    $('#work').val(data.PainInterferedNormalWork);
                    $('#relationships').val(data.PainInterferedRelationships);
                    $('#sleep').val(data.PainInterferedSleep);
                    $('#enjoyment').val(data.PainInterferedEnjoymentOfLife);

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

    // EDIT
    $('#editBtn').click(function() {
        $('input').removeAttr('readonly');
        $('#updateBtn').removeClass('d-none');
    });

    // UPDATE
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

    // DELETE
    $('#deleteBtn').click(function() {
        var patientId = $('#patientForm').data('patient-id');
        if (confirm("Are you sure you want to delete this patient's record?")) {
            $.ajax({
                url: 'index.php',
                type: 'POST',
                data: JSON.stringify({action: 'deletePatient', patientId: patientId}),
                dataType: 'json',
                contentType: 'application/json',
                success: function(response) {
                    if (response.status === 'success') {
                        fetchPatientDetails();
                        $('#success-msg').text("Patient's record deleted successfully").removeClass('d-none').delay(4000).fadeOut(2000);
                        $('#patientDetailsForm').hide();
                    } else {
                        fetchPatientDetails();
                        $('#error-msg').text("Unable to delete patient's record").removeClass('d-none');
                    }
                }
            });
        }
    });

    fetchPatientDetails();
});
