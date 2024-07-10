DROP TABLE IF EXISTS PatientDetailsAndBPI;

CREATE TABLE PatientDetailsAndBPI(
	ID INT PRIMARY KEY IDENTITY(1,1),
	FirstName NVARCHAR(50),
	Surname NVARCHAR(50),
	DateOfBirth Date,
	Age INT,
	ReliefPainTreatments INT,
	PainWorst INT,
	PainLeast INT,
	PainAverage INT,
	PainRightNow INT,
	PainInterferedGeneralActivity INT,
	PainInterferedMood INT,
	PainInterferedWalkingAbility INT,
	PainInterferedNormalWork INT,
	PainInterferedRelationships INT,
	PainInterferedSleep INT,
	PainInterferedEnjoymentOfLife INT,
	TotalScore INT,
	SubmissionDate Date DEFAULT GETDATE()
);
GO

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
GO


CREATE PROCEDURE sp_GetPatientDetails
AS
BEGIN
    SELECT ID, SubmissionDate, FirstName, Surname, Age, DateOfBirth, TotalScore
    FROM PatientDetailsAndBPI;
END
GO

CREATE PROCEDURE sp_GetPatientDetailsById
    @PatientId INT
AS
BEGIN
    SELECT * FROM PatientDetailsAndBPI WHERE ID = @PatientId;
END
GO

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
GO

CREATE PROCEDURE sp_DeletePatientDetails
    @PatientId INT
AS
BEGIN
    DELETE FROM PatientDetailsAndBPI WHERE ID = @PatientId;
END
