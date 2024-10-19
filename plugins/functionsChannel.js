// Código adaptado por https://github.com/GataNina-Li
// Código compatible con canales y comunidades de WhatsApp 

import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"

let handler = async (m, { conn, command, usedPrefix, args, text }) => {
const isCommand1 = /^(inspect2)$/i.test(command)
    
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
async function reportError(e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
}

switch (true) {     
case isCommand1:
let thumb = gataMenu.getRandom()
// Generar la información del grupo
const groupInfo = (res) => ({
id: res.id || "",
title: res.subject || "",
createdBy: `@${res.owner?.split("@")[0] || ""}`,
creationDate: formatDate(1e3 * res.creation) || "",
subjectOwner: res.subjectOwner ? `\n🏷️ *Título cambiado* por @${res.subjectOwner?.split("@")[0]} en *${formatDate(1e3 * res.subjectTime)}*` : "",
descOwner: res.descOwner ? `\n📝 *Descripción* por @${res.descOwner?.split("@")[0]} en *${formatDate(1e3 * res.descTime)}*` : "",
size: res.size || "",
topMembers: res.participants ? "\n👥 " + res.participants.slice(0, 5).map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n") : "No hay",
extraMembers: res.participants?.length > 5 ? `\nY ${res.participants.length - 5} otros miembros.` : "",
desc: res.desc ? `*Descripción:*\n${res.desc}` : "*No hay descripción*",
restrict: res.restrict ? "✅ Si" : "❌ No",
announce: res.announce ? "✅ Si" : "❌ No",
isCommunity: res.isCommunity ? "✅ Si" : "❌ No",
isCommunityAnnounce: res.isCommunityAnnounce ? "✅ Si" : "❌ No",
joinApprovalMode: res.joinApprovalMode ? "✅ Si" : "❌ No",
memberAddMode: res.memberAddMode ? "✅ Si" : "❌ No",
ephemeralDuration: res.ephemeralDuration !== undefined ? `${res.ephemeralDuration} segundos` : "desconocido"
})
let info
try {
// Intentar obtener la metadata del grupo
let res = await conn.groupMetadata(m.chat) // Si el bot está en el grupo
info = groupInfo(res)
} catch (error) {
console.error("Error al obtener la información del grupo:", error)
}

if (!info?.id) {              
// En caso que no este en el grupo va a intentar con el enlace
const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
if (inviteUrl) {
let inviteInfo = await conn.groupGetInviteInfo(inviteUrl)
if (!inviteInfo) return m.reply("Grupo no encontrado.")
info = groupInfo(inviteInfo);
}}
if (info) {
let caption = `*Inspector de enlaces de grupo*\n` +
`🔗 - ${info.id}\n` +
`*Título:* ${info.title}\n` +
`🗓️ *Creado* por ${info.createdBy} en *${info.creationDate}*` +
`${info.subjectOwner}` +
`${info.descOwner}\n` +
`👥 *Número de miembros:* ${info.size}\n` +
`👤 *Miembro superior:* ${info.topMembers}${info.extraMembers}\n` +
`${info.desc}\n\n` +
`*Detalles completos del grupo*\n\n` +
`🔒 *Restringido:* ${info.restrict}\n` +
`📢 *Anunciar:* ${info.announce}\n` +
`🏛️ *Es comunidad:* ${info.isCommunity}\n` +
`📣 *Es un anuncio de la comunidad:* ${info.isCommunityAnnounce}\n` +
`🔑 *Modo de Aprobación para Unirse:* ${info.joinApprovalMode}\n` +
`➕ *Modo para agregar Miembros:* ${info.memberAddMode}\n` +
`⏳ *Duración:* ${info.ephemeralDuration}`
let pp
try {
pp = await conn.profilePictureUrl(info.id)
} catch {
pp = thumb
}
await conn.reply(m.chat, caption, m, { contextInfo: {
mentionedJid: conn.parseMention(caption),
externalAdReply: {
title: "Ver enlace de grupo",
body: "",
mediaType: 1,
previewType: 0,
renderLargerThumbnail: false,
thumbnailUrl: pp,
sourceUrl: ""
}}})
} else {
// Manejo de enlaces de canal
const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
if (channelUrl) {
try {
let newsletterInfo = await conn.newsletterMetadata("invite", channelUrl)
if (!newsletterInfo) return m.reply("Canal no encontrado.")
let caption = "*Inspector de enlaces de Canales*\n\n" + processObject(newsletterInfo, "", newsletterInfo.preview)
let pp
if (newsletterInfo.preview) {
pp = getUrlFromDirectPath(newsletterInfo.preview)
} else {
pp = thumb
}
if (caption) {
await conn.sendMessage(m.chat, { text: caption, contextInfo: {
mentionedJid: conn.parseMention(caption),
externalAdReply: {
title: "Inspector de enlaces de Canales",
body: packname,
thumbnailUrl: pp,
sourceUrl: args[0],
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false
}}}, { quoted: fkontak })
}} catch (e) {
reportError(e)
}}}
break
        
}}
handler.command = /^(inspect2)$/i
handler.register = true
export default handler 

function formatDate(n, locale = "es", includeTime = true) {
if (n > 1e12) {
n = Math.floor(n / 1000)  // Convertir de milisegundos a segundos
} else if (n < 1e10) {
n = Math.floor(n * 1000)  // Convertir de segundos a milisegundos
}
const date = new Date(n)
if (isNaN(date)) return "Fecha no válida"
// Formato de fecha: día/mes/año
const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' }
const formattedDate = date.toLocaleDateString(locale, optionsDate)
if (!includeTime) return formattedDate
// horas, minutos y segundos
const hours = String(date.getHours()).padStart(2, '0')
const minutes = String(date.getMinutes()).padStart(2, '0')
const seconds = String(date.getSeconds()).padStart(2, '0')
const period = hours < 12 ? 'AM' : 'PM'
const formattedTime = `${hours}:${minutes}:${seconds} ${period}`
return `${formattedDate}, ${formattedTime}`
}

function formatValue(key, value, preview) {
console.log(value)
switch (key) {
case "subscribers":
return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "No hay suscriptores"
case "creation_time":
case "nameTime":
case "descriptionTime":
return formatDate(value)
case "description": 
case "name":
return value || "No hay información disponible"
case "state":
switch (value) {
case "ACTIVE": return "Activo"
case "GEOSUSPENDED": return "Suspendido por región"
case "SUSPENDED": return "Suspendido"
default: return "Desconocido"
}
case "reaction_codes":
switch (value) {
case "ALL": return "Todas las reacciones permitidas"
case "BASIC": return "Reacciones básicas permitidas"
case "NONE": return "No se permiten reacciones"
default: return "Desconocido"
}
case "verification":
switch (value) {
case "VERIFIED": return "Verificado"
case "UNVERIFIED": return "No verificado"
default: return "Desconocido"
}
case "mute":
switch (value) {
case "ON": return "Silenciado"
case "OFF": return "No silenciado"
case "UNDEFINED": return "Sin definir"
default: return "Desconocido"
}
case "view_role":
switch (value) {
case "ADMIN": return "Administrador"
case "OWNER": return "Propietario"
case "SUBSCRIBER": return "Suscriptor"
case "GUEST": return "Invitado"
default: return "Desconocido"
}
case "picture":
if (preview) {
return getUrlFromDirectPath(preview)
} else {
return "No hay imagen disponible"
}
default:
return value !== null && value !== undefined ? value.toString() : "No hay información disponible"
}}

function newsletterKey(key) {
return _.startCase(key.replace(/_/g, " "))
.replace("Id", "🆔 Identificador")
.replace("State", "📌 Estado")
.replace("Creation Time", "📅 Fecha de creación")
.replace("Name Time", "✏️ Fecha de modificación del nombre")
.replace("Name", "🏷️ Nombre")
.replace("Description Time", "📝 Fecha de modificación de la descripción")
.replace("Description", "📜 Descripción")
.replace("Invite", "📩 Invitación")
.replace("Handle", "👤 Alias")
.replace("Picture", "🖼️ Imagen")
.replace("Preview", "👀 Vista previa")
.replace("Reaction Codes", "😃 Reacciones")
.replace("Subscribers", "👥 Suscriptores")
.replace("Verification", "✅ Verificación")
.replace("Viewer Metadata", "🔍 Datos avanzados")
}

function processObject(obj, prefix = "", preview) {
let caption = ""
Object.keys(obj).forEach(key => {
const value = obj[key]
if (typeof value === "object" && value !== null) {
if (Object.keys(value).length > 0) {
const sectionName = newsletterKey(prefix + key)
caption += `\n*\`${sectionName}\`*\n`
caption += processObject(value, `${prefix}${key}_`)
}} else {
const shortKey = prefix ? prefix.split("_").pop() + "_" + key : key
const displayValue = formatValue(shortKey, value, preview)
const translatedKey = newsletterKey(shortKey)
caption += `- *${translatedKey}:*\n${displayValue}\n\n`
}})
return caption.trim()
}

