-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ExerciseStatus" AS ENUM ('ACTIVE', 'SOMETIMES', 'ALMOST_NEVER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('NON_VEGETARIAN', 'VEGETARIAN', 'EGGETARIAN', 'GRAVITARIAN', 'VEGAN', 'PESCATARIAN');

-- CreateEnum
CREATE TYPE "SettleDownStatus" AS ENUM ('WITHIN_A_YEAR', 'WITHIN_2_YEARS', 'WITHIN_3_YEARS', 'UNDECIDED');

-- CreateEnum
CREATE TYPE "DrinkingStatus" AS ENUM ('YES', 'NO', 'SOMETIMES', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "SmokingStatus" AS ENUM ('YES', 'NO', 'SOMETIMES', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "PoliticalStatus" AS ENUM ('APOLITICAL', 'MODERATE', 'LEFT', 'RIGHT', 'COMMUNIST', 'SOCIALIST', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('SECONDARY', 'SENIOR_SECONDARY', 'GRADUATE', 'POST_GRADUATE', 'DOCTORAL');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'WIDOWED', 'DIVORCED');

-- CreateEnum
CREATE TYPE "VaccinationStatus" AS ENUM ('VACCINATED', 'PARTIALLY', 'NOT_YET', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "ChildrenStatus" AS ENUM ('DONT_HAVE', 'HAVE', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "FamilyPlan" AS ENUM ('DONT_WANT', 'WANT', 'OPEN_TO_CHILDREN', 'NOT_SURE_YET', 'PREFER_NOT_TO_SAY');

-- CreateTable
CREATE TABLE "Religion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Religion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caste" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "religionID" TEXT NOT NULL,

    CONSTRAINT "Caste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLanguage" (
    "profileID" TEXT NOT NULL,
    "languageID" INTEGER NOT NULL,

    CONSTRAINT "UserLanguage_pkey" PRIMARY KEY ("profileID","languageID")
);

-- CreateTable
CREATE TABLE "Profile" (
    "bio" TEXT,
    "casteID" TEXT NOT NULL,
    "childrenStatus" "ChildrenStatus" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "diet" "Diet" NOT NULL,
    "drinking" "DrinkingStatus" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
    "educationLevel" "EducationLevel" NOT NULL,
    "exerciseStatus" "ExerciseStatus" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
    "familyPlan" "FamilyPlan" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
    "fullname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "hometown" JSONB NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL DEFAULT 'SINGLE',
    "motherTongueID" INTEGER NOT NULL,
    "nakshathram" TEXT NOT NULL,
    "pets" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "politics" "PoliticalStatus" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
    "settleDown" "SettleDownStatus" NOT NULL DEFAULT 'UNDECIDED',
    "smoking" "SmokingStatus" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
    "userID" TEXT NOT NULL,
    "vaccinationStatus" "VaccinationStatus" NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
    "work" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "ageFrom" INTEGER NOT NULL DEFAULT 0,
    "ageTo" INTEGER NOT NULL DEFAULT 0,
    "childrenStatus" "ChildrenStatus"[] DEFAULT ARRAY[]::"ChildrenStatus"[],
    "diet" "Diet"[] DEFAULT ARRAY[]::"Diet"[],
    "drinking" "DrinkingStatus"[] DEFAULT ARRAY[]::"DrinkingStatus"[],
    "educationLevel" "EducationLevel"[] DEFAULT ARRAY[]::"EducationLevel"[],
    "familyPlan" "FamilyPlan"[] DEFAULT ARRAY[]::"FamilyPlan"[],
    "gender" "Gender"[] DEFAULT ARRAY[]::"Gender"[],
    "heightFrom" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "heightTo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hometown" JSONB,
    "location" JSONB,
    "maritalStatus" "MaritalStatus"[] DEFAULT ARRAY[]::"MaritalStatus"[],
    "nakshathram" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pets" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "politics" "PoliticalStatus"[] DEFAULT ARRAY[]::"PoliticalStatus"[],
    "profileID" TEXT NOT NULL,
    "smoking" "SmokingStatus"[] DEFAULT ARRAY[]::"SmokingStatus"[],
    "vaccinationStatus" "VaccinationStatus"[] DEFAULT ARRAY[]::"VaccinationStatus"[],

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("profileID")
);

-- CreateTable
CREATE TABLE "PreferenceMothertongue" (
    "mothertongueID" INTEGER NOT NULL,
    "preferenceID" TEXT NOT NULL,

    CONSTRAINT "PreferenceMothertongue_pkey" PRIMARY KEY ("mothertongueID","preferenceID")
);

-- CreateTable
CREATE TABLE "PreferenceLanguage" (
    "languageID" INTEGER NOT NULL,
    "preferenceID" TEXT NOT NULL,

    CONSTRAINT "PreferenceLanguage_pkey" PRIMARY KEY ("languageID","preferenceID")
);

-- CreateTable
CREATE TABLE "PreferenceCaste" (
    "casteID" TEXT NOT NULL,
    "preferenceID" TEXT NOT NULL,

    CONSTRAINT "PreferenceCaste_pkey" PRIMARY KEY ("casteID","preferenceID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- AddForeignKey
ALTER TABLE "Caste" ADD CONSTRAINT "Caste_religionID_fkey" FOREIGN KEY ("religionID") REFERENCES "Religion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD CONSTRAINT "UserLanguage_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD CONSTRAINT "UserLanguage_languageID_fkey" FOREIGN KEY ("languageID") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_casteID_fkey" FOREIGN KEY ("casteID") REFERENCES "Caste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_motherTongueID_fkey" FOREIGN KEY ("motherTongueID") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenceMothertongue" ADD CONSTRAINT "PreferenceMothertongue_mothertongueID_fkey" FOREIGN KEY ("mothertongueID") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenceMothertongue" ADD CONSTRAINT "PreferenceMothertongue_preferenceID_fkey" FOREIGN KEY ("preferenceID") REFERENCES "Preferences"("profileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenceLanguage" ADD CONSTRAINT "PreferenceLanguage_languageID_fkey" FOREIGN KEY ("languageID") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenceLanguage" ADD CONSTRAINT "PreferenceLanguage_preferenceID_fkey" FOREIGN KEY ("preferenceID") REFERENCES "Preferences"("profileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenceCaste" ADD CONSTRAINT "PreferenceCaste_casteID_fkey" FOREIGN KEY ("casteID") REFERENCES "Caste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenceCaste" ADD CONSTRAINT "PreferenceCaste_preferenceID_fkey" FOREIGN KEY ("preferenceID") REFERENCES "Preferences"("profileID") ON DELETE RESTRICT ON UPDATE CASCADE;
