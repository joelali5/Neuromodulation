(function() {
    function observeDomChanges() {
        console.log("DOM is being observed for changes.");
    }

    function setupFormSubmission() {
        $('#submitForms').on('click', function(e) {
            e.preventDefault();

            var treatmentValue = parseInt($('#treatment').val(), 10);

            var patientBio = {
                firstName: $('#firstName').val(),
                surname: $('#surname').val(),
                dateOfBirth: $('#dateOfBirth').val(),
            };

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
            
            if (isNaN(treatmentValue) || treatmentValue < 0 || treatmentValue > 100) {
                $('#error-message').text('Please enter a value between 0 and 100 for treatment');
                return;
            } else {
                $('#error-message').hide();
                $.ajax({
                    url: 'index.php',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({'patientBio': patientBio, 'bpiDetails': bpiDetails}),
                    success: function(response) {
                        console.log('Server response:', response);
                        $('#success-message').text('Form submitted successfully!').show().delay(3000).fadeOut();

                        $('#patientDetails')[0].reset();
                    },
                    error: function(xhr, status, error) {
                        console.error('Error: ', error);
                        $('#error-message').text('An error occurred while submitting the form. Please try again.');
                    },
                });
            }
            
        });
    }

    function init() {
        observeDomChanges();
        setupFormSubmission();
    }

    init();
})();
