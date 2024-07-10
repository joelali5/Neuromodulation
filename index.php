<?php
header("Content-Type: application/json");

// CREATE A DATABASE CONNECTION USING PDO WITH SQL SERVER
function createDatabaseConnection(){
    try {
        $serverName = "BEBE\\SQLEXPRESS";
        $database = "NeuromodulationDB";
        $connection = new PDO("sqlsrv:Server=$serverName;Database=$database;", "", "");
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;
    } catch (PDOException $error) {
        http_response_code(500);
        echo json_encode(['error' => 'Error connecting to the SQL Server: ' . $error->getMessage()]);
        exit;
    }
}

$pdo = createDatabaseConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (isset($data['patientBio']) && isset($data['bpiDetails'])) {

        $patientDetails = $data['patientBio'];
        $bpi = $data['bpiDetails'];
        $totalScore = 0;

        foreach ($bpi as $key => $value) {
            if ($key !== 'treatment') {
                $totalScore += (int) $value;
            }
        }

        $dateOfBirth = new DateTime($patientDetails['dateOfBirth']);
        $current = new DateTime();
        $difference = $current->diff($dateOfBirth);
        $age = $difference->y;

        $submissionDate = (new DateTime())->format('Y-m-d H:i:s');

        try {
            $pdo->beginTransaction();

            $sqlBio = "INSERT INTO PatientDetailsAndBPI (FirstName, Surname, DateOfBirth, Age, ReliefPainTreatments, PainWorst, PainLeast, PainAverage, PainRightNow, PainInterferedGeneralActivity, PainInterferedMood, PainInterferedWalkingAbility, PainInterferedNormalWork, PainInterferedRelationships, PainInterferedSleep, PainInterferedEnjoymentOfLife, TotalScore, SubmissionDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmtBio = $pdo->prepare($sqlBio);
            $stmtBio->execute([
                $patientDetails['firstName'],
                $patientDetails['surname'],
                $patientDetails['dateOfBirth'],
                $age,
                (int) $bpi['treatment'],
                (int) $bpi['worst'],
                (int) $bpi['least'],
                (int) $bpi['average'],
                (int) $bpi['now'],
                (int) $bpi['activity'],
                (int) $bpi['mood'],
                (int) $bpi['walking'],
                (int) $bpi['work'],
                (int) $bpi['relationships'],
                (int) $bpi['sleep'],
                (int) $bpi['enjoyment'],
                $totalScore,
                $submissionDate
            ]);

            $pdo->commit();

            echo json_encode(['status' => "Patient's details have been saved successfully!"]);
        } catch (PDOException $e) {
            $pdo->rollBack();
            error_log("Database error: " . $e->getMessage());
            echo json_encode(['status' => 'error', 'message' => 'Error submitting patient details: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    if ($_GET['action'] === 'getPatientDetails') {
        $sql = "SELECT ID, SubmissionDate, FirstName, Surname, Age, DateOfBirth, TotalScore
                FROM PatientDetailsAndBPI";
    
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            echo json_encode(['status' => 'success', 'data' => $results]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Error fetching patient details: ' . $e->getMessage()]);
        }
    } elseif ($_GET['action'] === 'fetchPatientDetails' && isset($_GET['patientId'])) {
        $patientId = $_GET['patientId'];
        $sql = "SELECT * FROM PatientDetailsAndBPI WHERE ID = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$patientId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['status' => 'success', 'data' => $result]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid action or missing parameters']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method or missing parameters']);
}
?>
