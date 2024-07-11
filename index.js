$(document).ready(function() {
    $('#submitForms').on('click', function(e) {
        e.preventDefault();

        var errMsg = '';
        var treatmentValue = parseInt($('#treatment').val(), 10);

        var patientBio = {
            firstName: $('#firstName').val().trim(),
            surname: $('#surname').val().trim(),
            dateOfBirth: $('#dateOfBirth').val().trim(),
        };

        function showSpinner() {
            $('#loadingOverlay').show();
        }
    
        function hideSpinner() {
            $('#loadingOverlay').hide();
        }    

        var bpiDetails = {
            treatment: treatmentValue,
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

        if (!patientBio.firstName || !patientBio.surname || !patientBio.dateOfBirth) {
            errMsg = 'Please fill out all form fields.';
        } else if (isNaN(treatmentValue) || treatmentValue < 0 || treatmentValue > 100) {
            errMsg = 'Please enter a treatment value between 0 and 100.';
        }
        
        if (errMsg) {
            $('#error-message').text(errMsg).show();
        } else {
            $('#error-message').hide();
            showSpinner();
            $.ajax({
                url: 'index.php',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({'patientBio': patientBio, 'bpiDetails': bpiDetails}),
                success: function(response) {
                    hideSpinner();
                    $('#success-message').text(response.status).show().delay(4000).fadeOut();

                    $('#patientDetails')[0].reset();
                },
                error: function(xhr, status, error) {
                    hideSpinner();
                    $('#error-message').text(error);
                },
            });
        }
        
    });
});
