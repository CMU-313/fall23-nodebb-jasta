'use strict';

import { json } from "body-parser";

const user = require('../../user');
const meta = require('../../meta');
const db = require('../../database');
const pagination = require('../../pagination');
const events = require('../../events');
const plugins = require('../../plugins');
const privileges = require('../../privileges');
const utils = require('../../utils');
const fs = require('fs');

function generateCodes(length: number): string[] {
    // init alphanumeric values to choose from, no I L 0 O because can look similar
    const characters: string = 'ABCDEFGHJKMNPQRSTUVWXYZ123456789';
    // init prof code
    var profCode = '';
    // init ta code
    var taCode = '';
    // init student code
    var studentCode = '';

    // generate code for prof
    for (var i = 0; i < length; i++) {
        const charIndex = Math.floor(Math.random() * characters.length);
        profCode += characters.charAt(charIndex);
    }
    // generate code for ta
    for (var i = 0; i < length; i++) {
        const charIndex = Math.floor(Math.random() * characters.length);
        taCode += characters.charAt(charIndex);
    }
    // generate code for student
    for (var i = 0; i < length; i++) {
        const charIndex = Math.floor(Math.random() * characters.length);
        studentCode += characters.charAt(charIndex);
    }

    const codes: string[] = [profCode, taCode, studentCode];
    return codes;
}

function makeClassCodes() {
    const codes: string[] = generateCodes(3);
    const newJSON: Record<string, any> = addCodesToJSON(codes);
}


function addCodesToJSON(codes: string[]): Record<string, any> {
  // Add the codes to existing json
  const newJSON: Record<string, any> = 
  {
    "queue": "Queue",
    "description": "There are no users in the registration queue. <br> To enable this feature, go to <a href=\"%1\">Settings &rarr; User &rarr; User Registration</a> and set <strong>Registration Type</strong> to \"Admin Approval\".",

    "list.name": "Name",
    "list.email": "Email",
    "list.ip": "IP",
    "list.time": "Time",
    "list.username-spam": "Frequency: %1 Appears: %2 Confidence: %3",
    "list.email-spam": "Frequency: %1 Appears: %2",
    "list.ip-spam": "Frequency: %1 Appears: %2",

    "invitations": "Invitations",
    "invitations.description": "Below is a complete list of invitations sent. Use ctrl-f to search through the list by email or username. <br><br>The username will be displayed to the right of the emails for users who have redeemed their invitations.",
    "invitations.inviter-username": "Inviter Username",
    "invitations.invitee-email": "Invitee Email",
    "invitations.invitee-username": "Invitee Username (if registered)",

    "invitations.confirm-delete": "Are you sure you wish to delete this invitation?",

    "class-codes": "Class Codes",
    "class-codes.description": "Below are the class codes for each group to register for the class.",
    "class-codes.prof-code": "Professors: " + codes[0],
    "class-codes.ta-code": "Teaching Assistants: " + codes[1],
    "class-codes.student-code": "Students: " + codes[2]
  } 
  return newJSON;
}
