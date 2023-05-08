import inquirer from 'inquirer';
import questions from './questions';

/**
 * Get CHECK details as entered by the user for the prompted questions
 * @method getChecks
 * @param {Array} checks recursively constructed list of CHECKS for the RULE
 * @returns {Array}
 */
const getChecks = async (checks: { getIsAnotherCheck: string }[] = []) => {
  const checkDetails: { getIsAnotherCheck: string } = await inquirer.prompt([
    questions.getCheckName,
    questions.getCheckCategory,
    questions.getCheckType,
    questions.getIsAnotherCheck
  ]);
  checks.push(checkDetails);
  if (checkDetails.getIsAnotherCheck) {
    await getChecks(checks);
  }
  return checks;
};

/**
 * Seek answers by prompting a serious of questions to the user for rule generation
 * @method getAnswers
 * @returns {Object} answers
 */
const getAnswers = async () => {
  // answers for RULE meta data
  const { getRuleName, getIsRuleMatches } = await inquirer.prompt([
    questions.getRuleName,
    questions.getIsRuleMatches
  ]);

  // answers for CHECK meta data
  let ruleChecks: { getIsAnotherCheck: string }[] = [];

  const { getIsCheck } = await inquirer.prompt([questions.getIsCheck]);

  if (getIsCheck) {
    ruleChecks = await getChecks();
  }

  // answers if TEST files to be created
  const { getIsUnitTestAssets, getIsIntegrationTestAssets } =
    await inquirer.prompt([
      questions.getIsUnitTestAssets,
      questions.getIsIntegrationTestAssets
    ]);

  return {
    ruleName: getRuleName.toLowerCase(),
    ruleHasMatches: getIsRuleMatches,
    ruleChecks,
    ruleHasUnitTestAssets: getIsUnitTestAssets,
    ruleHasIntegrationTestAssets: getIsIntegrationTestAssets
  };
};

module.exports = getAnswers;
