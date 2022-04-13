/**
 * Copyright (c) Moodle Pty Ltd.
 *
 * Moodle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Moodle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
 */
const path = require('path');

const obsoleteDocs = [
    'Setting_up_Eclipse',
    'Setting_up_Netbeans',
];

/**
 * A list of documents which have been migrated with their source and destination paths shown.
 */
const migratedDocs = {
    Access_API: '/docs/apis/access.md',
    Activity_modules: '/docs/apis/plugintypes/mod.md',
    Coding_style: '/general/development/policies/codingstyle/index.md',
    Communication_between_components: '/general/development/policies/component-communication/index.md',
    Developer_meeting_February_2022: '/general/community/meetings/202202.md',
    Developer_meetings: '/general/community/meetings.md',
    Integration_review: '/general/development/process/integration-review.md',
    Mission: '/general/community/mission.md',
    Moodle_research: '/general/community/research.md',
    Overview: '/general/community/intro.md',
    Peer_reviewing: '/general/development/process/peer-review.md',
    Process: '/general/development/process.md',
    Roadmap: '/general/community/roadmap.md',
    Tracker_intro: '/general/development/tracker.md',
    Tracker_tips: '/general/development/tracker/tips.md',
};

const isObsolete = (legacyPath) => obsoleteDocs.indexOf(legacyPath) !== -1;

/**
 * Whether the specified path has been migrated.
 *
 * @returns {bool}
 */
const isMigrated = (legacyPath) => (typeof migratedDocs[legacyPath] !== 'undefined');

/**
 * Get the path to the new doc from a legacy doc path.
 *
 * @param legacyPath {string}
 * @returns {string}
 */
const getMigratedDoc = (legacyPath) => {
    if (!isMigrated) {
        return null;
    }

    const filename = migratedDocs[legacyPath];

    if (filename.startsWith('/')) {
        return filename.substr(1);
    }

    return filename;
};

/**
 * Get the path to the new doc relative to the file it was in.
 *
 * This has to consider whether the file is in the same docs instance or not due to versioning.
 *
 * @param {string} legacyPath
 * @param {string} usedIn
 * @returns {string}
 */
const getMigrationLink = (legacyPath, usedIn) => {
    const replacementFile = getMigratedDoc(legacyPath);
    if (!replacementFile) {
        return null;
    }

    const relativeUsedIn = path.relative(process.env.PWD, usedIn);

    const replacementIsGeneral = replacementFile.startsWith('general/');
    const usedInIsGeneral = relativeUsedIn.startsWith('general/');
    const bothGeneral = replacementIsGeneral && usedInIsGeneral;
    const neitherGeneral = !replacementIsGeneral && !usedInIsGeneral;

    if (bothGeneral || neitherGeneral) {
        return path.relative(replacementFile, relativeUsedIn);
    }

    if (replacementFile.endsWith('index.md')) {
        return `/${replacementFile.replace(/\/index\.md$/, '')}`;
    }

    if (replacementFile.endsWith('.md')) {
        return `/${replacementFile.replace(/\.md$/, '')}`;
    }

    return `/${replacementFile}`;
};

module.exports = {
    isMigrated,
    isObsolete,
    getMigrationLink,
};
