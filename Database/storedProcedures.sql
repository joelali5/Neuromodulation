-- Stored procedure to insert patient details
CREATE PROCEDURE sp_InsertPatientDetailsAndBPI
    @FirstName NVARCHAR(50),
    @Surname NVARCHAR(50),
    @DateOfBirth DATE,
    @Age INT,
    @ReliefPainTreatments INT,
    @PainWorst INT,
    @PainLeast INT,
    @PainAverage INT,
    @PainRightNow INT,
    @PainInterferedGeneralActivity INT,
    @PainInterferedMood INT,
    @PainInterferedWalkingAbility INT,
    @PainInterferedNormalWork INT,
    @PainInterferedRelationships INT,
    @PainInterferedSleep INT,
    @PainInterferedEnjoymentOfLife INT,
    @TotalScore INT,
    @SubmissionDate DATETIME
AS
BEGIN
    INSERT INTO PatientDetailsAndBPI (FirstName, Surname, DateOfBirth, Age, ReliefPainTreatments, PainWorst, PainLeast, PainAverage, PainRightNow, PainInterferedGeneralActivity, PainInterferedMood, PainInterferedWalkingAbility, PainInterferedNormalWork, PainInterferedRelationships, PainInterferedSleep, PainInterferedEnjoymentOfLife, TotalScore, SubmissionDate)
    VALUES (@FirstName, @Surname, @DateOfBirth, @Age, @ReliefPainTreatments, @PainWorst, @PainLeast, @PainAverage, @PainRightNow, @PainInterferedGeneralActivity, @PainInterferedMood, @PainInterferedWalkingAbility, @PainInterferedNormalWork, @PainInterferedRelationships, @PainInterferedSleep, @PainInterferedEnjoymentOfLife, @TotalScore, @SubmissionDate);
END

-- Stored procedure to get patient details
CREATE PROCEDURE sp_GetPatientDetails
AS
BEGIN
    SELECT ID, SubmissionDate, FirstName, Surname, Age, DateOfBirth, TotalScore
    FROM PatientDetailsAndBPI;
END


-- Stored procedure to get patient details by ID
CREATE PROCEDURE sp_GetPatientDetailsById
    @PatientId INT
AS
BEGIN
    SELECT * FROM PatientDetailsAndBPI WHERE ID = @PatientId;
END

-- Stored procedure to update patient details
CREATE PROCEDURE sp_UpdatePatientDetails
    @PatientId INT,
    @FirstName NVARCHAR(50),
    @Surname NVARCHAR(50),
    @ReliefPainTreatments INT,
    @PainWorst INT,
    @PainLeast INT,
    @PainAverage INT,
    @PainRightNow INT,
    @PainInterferedGeneralActivity INT,
    @PainInterferedMood INT,
    @PainInterferedWalkingAbility INT,
    @PainInterferedNormalWork INT,
    @PainInterferedRelationships INT,
    @PainInterferedSleep INT,
    @PainInterferedEnjoymentOfLife INT,
	@TotalScore INT
AS
BEGIN
    UPDATE PatientDetailsAndBPI
    SET FirstName = @FirstName, 
        Surname = @Surname, 
        ReliefPainTreatments = @ReliefPainTreatments, 
        PainWorst = @PainWorst, 
        PainLeast = @PainLeast, 
        PainAverage = @PainAverage, 
        PainRightNow = @PainRightNow, 
        PainInterferedGeneralActivity = @PainInterferedGeneralActivity, 
        PainInterferedMood = @PainInterferedMood, 
        PainInterferedWalkingAbility = @PainInterferedWalkingAbility, 
        PainInterferedNormalWork = @PainInterferedNormalWork, 
        PainInterferedRelationships = @PainInterferedRelationships, 
        PainInterferedSleep = @PainInterferedSleep, 
        PainInterferedEnjoymentOfLife = @PainInterferedEnjoymentOfLife,
		TotalScore = @TotalScore
    WHERE ID = @PatientId;
END

-- Stored procedure to delete patient record
CREATE PROCEDURE sp_DeletePatientDetails
    @PatientId INT
AS
BEGIN
    DELETE FROM PatientDetailsAndBPI WHERE ID = @PatientId;
END
