// Código adaptado por https://github.com/GataNina-Li
// Código compatible con canales y comunidades de WhatsApp 

import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"

let handler = async (m, { conn, command, usedPrefix, args, text, groupMetadata }) => {
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
let pp
let inviteCode
const groupInfo = async (res, isInviteInfo = false) => {
let nameCommunity = "no pertenece a ninguna Comunidad"
let groupPicture = "No se pudo obtener"
if (res.linkedParent) {
try {
let linkedGroupMeta = await conn.groupMetadata(res.linkedParent)
nameCommunity = "\n" + (linkedGroupMeta.subject || "")
} catch (e) {
nameCommunity = ""
console.log(e)
}}
//try {
//groupPicture = await conn.profilePictureUrl(res.id, 'image')
//pp = groupPicture
//} catch (e) {
//pp = null
//console.log(e)
//}
groupPicture = await conn.profilePictureUrl(res.id, 'image').catch(e => {
console.log(e)
return null
})
pp = groupPicture || "No se pudo obtener"

try {
inviteCode = await conn.groupInviteCode(m.chat)
} catch (e) {
inviteCode = null
console.log(e)
}
const formatParticipants = (participants) =>
participants && participants.length > 0
? participants.map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n")
: "No encontrado"
let caption = `*ID del grupo:*\n${res.id || "No encontrado"}\n\n` +
`*Creado por:*\n${res.owner ? `@${res.owner?.split("@")[0]}` : "No encontrado"} ${res.creation ? `el ${formatDate(res.creation)}` : "(Fecha no encontrada)"}\n\n` +
`*Nombre:*\n${res.subject || "No encontrado"}\n\n` +
`*Nombre cambiado por:*\n${res.subjectOwner ? `@${res.subjectOwner?.split("@")[0]}` : "No encontrado"} ${res.subjectTime ? `el ${formatDate(res.subjectTime)}` : "(Fecha no encontrada)"}\n\n` +
`*Descripción:*\n${res.desc || "No encontrado"}\n\n` +
`*Id de la descripción:*\n${res.descId || "No encontrado"}\n\n` +
`*Imagen del grupo:*\n${groupPicture}\n\n` 

// Parámetros que solo están disponibles en los metadatos
if (!isInviteInfo) {
caption += `*Descripción cambiado por:*\n${res.descOwner ? `@${res.descOwner?.split("@")[0]}` : "No encontrado"}\n\n` +
`*Autor:*\n${res.author || "No encontrado"}\n\n` +
`*Código de invitación:*\n${res.inviteCode || inviteCode || "No disponible"}\n\n` +
`*Restricciones:* ${res.restrict ? "✅ Si" : "❌ No"}\n\n` +
`*Modo para agregar miembros:* ${res.memberAddMode ? "✅ Si" : "❌ No"}\n\n` +
`*Duración:* ${res.ephemeralDuration !== undefined ? `${res.ephemeralDuration} segundos` : "Desconocido"}\n\n` +
`*Admins:*\n` + (res.participants && res.participants.length > 0 ? res.participants.filter(user => user.admin === "admin" || user.admin === "superadmin").map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : " (admin)"}`).join("\n") : "No encontrado") + `\n\n` +
`*Usuarios en total:*\n${res.size || "Cantidad no encontrada"}\n\n`
}
if (isInviteInfo) {
caption += `*Miembros destacados:*\n${formatParticipants(res.participants)}\n\n` +
`*Destacados total:*\n${res.size || "Cantidad no encontrada"}\n\n`
}

// Parámetros comunes tanto para metadatos como para enlace de invitación
caption += `*Comunidad vinculada al grupo:*\n${res.isCommunity ? "Este grupo es un chat de avisos" : `${res.linkedParent ? res.linkedParent : "Este grupo"} ${nameCommunity}`}\n\n` +
`*Anuncios:* ${res.announce ? "✅ Si" : "❌ No"}\n` +
`*¿Es comunidad?:* ${res.isCommunity ? "✅ Si" : "❌ No"}\n` +
`*¿Es anuncio de comunidad?:* ${res.isCommunityAnnounce ? "✅ Si" : "❌ No"}\n` +
`*Modo de aprobación de miembros:* ${res.joinApprovalMode ? "✅ Si" : "❌ No"}\n` 
return caption.trim()
}
let info
try {
let res = text ? null : await conn.groupMetadata(m.chat)
info = await groupInfo(res)
console.log('Método de metadatos')
} catch {
const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
let inviteInfo
if (inviteUrl) {
try {
inviteInfo = await conn.groupGetInviteInfo(inviteUrl)
} catch (e) {
m.reply('Grupo no encontrado')
return
}
info = await groupInfo(inviteInfo, true)
console.log(info)
console.log('Método de enlace')
}}
if (inviteUrl) {
await conn.sendMessage(m.chat, { text: info, contextInfo: {
mentionedJid: conn.parseMention(info),
externalAdReply: {
title: "🔰 Inspector de Grupos",
body: packname,
thumbnailUrl: pp ? pp : thumb,
sourceUrl: args[0] ? args[0] : inviteCode ? `https://chat.whatsapp.com/${inviteCode}` : md,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: fkontak })
} else {
// Manejo de enlaces de canales
const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
if (channelUrl) {
try {
let newsletterInfo = await conn.newsletterMetadata("invite", channelUrl)
if (!newsletterInfo) return m.reply("Canal no encontrado.")
let caption = "*Inspector de enlaces de Canales*\n\n" + processObject(newsletterInfo, "", newsletterInfo.preview)
if (newsletterInfo.preview) {
pp = getUrlFromDirectPath(newsletterInfo.preview)
} else {
pp = thumb
}
await conn.sendMessage(m.chat, { text: caption, contextInfo: {
mentionedJid: conn.parseMention(caption),
externalAdReply: {
title: "📢 Inspector de Canales",
body: packname,
thumbnailUrl: pp,
sourceUrl: args[0],
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false
}}}, { quoted: fkontak })
} catch (e) {
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

