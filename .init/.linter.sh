#!/bin/bash
cd /home/kavia/workspace/code-generation/secure-notes-organizer-2377-2388/notes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

