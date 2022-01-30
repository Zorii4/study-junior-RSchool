const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname,'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green('Notes was added'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath,{encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function rewriteNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function removeNote(id) {
    const notes = await getNotes()
    console.log(chalk.red(`Note with ${id} was removed`))
    return await rewriteNotes(notes.filter (note=>note.id !== id))
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue('List Notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.title))
    })
}

module.exports = {
    addNote,
    printNotes,
    removeNote
}