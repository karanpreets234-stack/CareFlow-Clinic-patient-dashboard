const appointments = [
  {id:1,name:"Olivia Bennett",patientId:"PT-1048",initials:"OB",color:"pink",type:"General consultation",time:"09:00 AM",provider:"Dr. Sarah Chen",providerInitials:"SC",checkin:"08:52 AM",queue:0,status:"Completed"},
  {id:2,name:"Noah Williams",patientId:"PT-1052",initials:"NW",color:"blue",type:"Follow-up visit",time:"09:15 AM",provider:"Dr. James Rivera",providerInitials:"JR",checkin:"09:09 AM",queue:0,status:"Completed"},
  {id:3,name:"Ava Thompson",patientId:"PT-1057",initials:"AT",color:"gold",type:"Child wellness",time:"09:30 AM",provider:"Dr. James Rivera",providerInitials:"JR",checkin:"09:25 AM",queue:0,status:"Completed"},
  {id:4,name:"Liam Patel",patientId:"PT-1061",initials:"LP",color:"mint",type:"General consultation",time:"10:00 AM",provider:"Dr. Sarah Chen",providerInitials:"SC",checkin:"09:56 AM",queue:0,status:"Completed"},
  {id:5,name:"Emma Wilson",patientId:"PT-1064",initials:"EW",color:"lavender",type:"Family medicine",time:"10:15 AM",provider:"Dr. Priya Nair",providerInitials:"PN",checkin:"10:06 AM",queue:1,status:"In consultation"},
  {id:6,name:"Ethan Davis",patientId:"PT-1068",initials:"ED",color:"blue",type:"Follow-up visit",time:"10:30 AM",provider:"Dr. Sarah Chen",providerInitials:"SC",checkin:"10:24 AM",queue:0,status:"Completed"},
  {id:7,name:"Sophia Garcia",patientId:"PT-1073",initials:"SG",color:"pink",type:"General consultation",time:"10:45 AM",provider:"Dr. Priya Nair",providerInitials:"PN",checkin:"10:39 AM",queue:2,status:"Waiting"},
  {id:8,name:"Mason Clark",patientId:"PT-1079",initials:"MC",color:"mint",type:"Family medicine",time:"11:00 AM",provider:"Dr. Sarah Chen",providerInitials:"SC",checkin:"10:54 AM",queue:3,status:"Waiting"},
  {id:9,name:"Isabella Lewis",patientId:"PT-1082",initials:"IL",color:"gold",type:"Child wellness",time:"11:15 AM",provider:"Dr. James Rivera",providerInitials:"JR",checkin:"11:08 AM",queue:4,status:"Waiting"},
  {id:10,name:"Lucas Martin",patientId:"PT-1087",initials:"LM",color:"lavender",type:"General consultation",time:"11:30 AM",provider:"Dr. Priya Nair",providerInitials:"PN",checkin:"11:24 AM",queue:5,status:"Waiting"},
  {id:11,name:"Mia Anderson",patientId:"PT-1091",initials:"MA",color:"pink",type:"Follow-up visit",time:"11:45 AM",provider:"Dr. Sarah Chen",providerInitials:"SC",checkin:"11:38 AM",queue:6,status:"Checked in"},
  {id:12,name:"James Robinson",patientId:"PT-1096",initials:"JR",color:"blue",type:"General consultation",time:"12:00 PM",provider:"Dr. Priya Nair",providerInitials:"PN",checkin:"—",queue:null,status:"Checked in"}
];
const pageSize = 8;
let currentPage = 1;
let nextId = 13;
const $ = id => document.getElementById(id);

function statusClass(status){
  return status === "Waiting" ? "status-waiting" : status === "In consultation" ? "status-consultation" : status === "Completed" ? "status-completed" : "status-checked";
}
function initials(name){ return name.split(/\s+/).map(part=>part[0]).slice(0,2).join("").toUpperCase(); }
function filteredAppointments(){
  const query = $("searchInput").value.trim().toLowerCase();
  const status = $("statusFilter").value;
  return appointments.filter(a => (status === "all" || a.status === status) &&
    [a.name,a.patientId,a.provider,a.type].some(value=>value.toLowerCase().includes(query)));
}
function renderAppointments(){
  const filtered = filteredAppointments();
  const pages = Math.max(1,Math.ceil(filtered.length/pageSize));
  currentPage = Math.min(currentPage,pages);
  const start = (currentPage-1)*pageSize;
  const visible = filtered.slice(start,start+pageSize);
  $("appointmentRows").innerHTML = visible.map(a => `
    <tr>
      <td><div class="patient-cell"><span class="patient-avatar ${a.color}">${a.initials}</span><div><div class="patient-name">${escapeHTML(a.name)}</div><div class="patient-id">${escapeHTML(a.patientId)}</div></div></div></td>
      <td><div class="appointment-type">${escapeHTML(a.type)}</div><div class="appointment-date">${escapeHTML(a.time)}</div></td>
      <td><div class="provider-cell"><span class="provider-mini">${escapeHTML(a.providerInitials)}</span><span class="provider-label">${escapeHTML(a.provider)}</span></div></td>
      <td><span class="time-cell">${escapeHTML(a.checkin)}</span></td>
      <td><span class="queue-number ${a.queue===null?'none':a.queue>=3?'urgent':''}">${a.queue===null?'—':String(a.queue).padStart(2,"0")}</span></td>
      <td><span class="status-pill ${statusClass(a.status)}">${escapeHTML(a.status)}</span></td>
      <td><button class="row-menu" data-action="${a.id}" aria-label="Change status for ${escapeHTML(a.name)}" title="Change visit status">•••</button></td>
    </tr>`).join("");
  $("emptyState").hidden = visible.length !== 0;
  $("tableSummary").textContent = filtered.length ? `Showing ${start+1}–${Math.min(start+pageSize,filtered.length)} of ${filtered.length} appointments` : "Showing 0 appointments";
  $("tableCount").textContent = filtered.length;
  $("navAppointmentCount").textContent = appointments.length;
  $("pageIndicator").textContent = `${currentPage} / ${pages}`;
  $("prevPage").disabled = currentPage===1;
  $("nextPage").disabled = currentPage===pages;
  $("statAppointments").textContent = Math.max(24,appointments.length);
  $("statWaiting").innerHTML = `${String(appointments.filter(a=>a.status==="Waiting").length).padStart(2,"0")} <small>patients</small>`;
  $("statCompleted").innerHTML = `${appointments.filter(a=>a.status==="Completed").length+2} <small>/ ${Math.max(24,appointments.length)}</small>`;
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
let toastTimer;
function showToast(message){
  const toast=$("toast"); toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
}
$("searchInput").addEventListener("input",()=>{currentPage=1;renderAppointments();});
$("statusFilter").addEventListener("change",()=>{currentPage=1;renderAppointments();});
$("prevPage").addEventListener("click",()=>{if(currentPage>1){currentPage--;renderAppointments();}});
$("nextPage").addEventListener("click",()=>{currentPage++;renderAppointments();});
$("clearFiltersBtn").addEventListener("click",()=>{$("searchInput").value="";$("statusFilter").value="all";currentPage=1;renderAppointments();showToast("Filters have been reset.");});

$("appointmentRows").addEventListener("click",event=>{
  const button=event.target.closest("[data-action]");
  if(!button)return;
  const appointment=appointments.find(a=>a.id===Number(button.dataset.action));
  if(!appointment)return;
  const statuses=["Checked in","Waiting","In consultation","Completed"];
  const next=statuses[(statuses.indexOf(appointment.status)+1)%statuses.length];
  appointment.status=next;
  if(next==="Completed")appointment.queue=0;
  if(next==="Waiting" && (appointment.queue===null || appointment.queue===0))appointment.queue=1;
  renderAppointments();
  showToast(`${appointment.name}'s visit status changed to ${next}.`);
});

const dialog=$("appointmentDialog");
$("newAppointmentBtn").addEventListener("click",()=>dialog.showModal());
$("closeModal").addEventListener("click",()=>dialog.close());
$("cancelModal").addEventListener("click",()=>dialog.close());
$("appointmentForm").addEventListener("submit",event=>{
  event.preventDefault();
  const name=$("patientName").value.trim();
  if(!name)return;
  const provider=$("patientProvider").value;
  const rawTime=$("patientTime").value || "15:30";
  const [hours,minutes]=rawTime.split(":").map(Number);
  const time=`${String((hours%12)||12).padStart(2,"0")}:${String(minutes).padStart(2,"0")} ${hours>=12?"PM":"AM"}`;
  const providerInitials=initials(provider.replace("Dr. ",""));
  const id=nextId++;
  appointments.push({id,name,patientId:`PT-${1100+id}`,initials:initials(name),color:["pink","blue","gold","mint","lavender"][id%5],type:$("patientVisit").value,time,provider,providerInitials,checkin:"Not checked in",queue:null,status:"Checked in"});
  $("appointmentForm").reset(); $("patientTime").value="15:30"; dialog.close(); currentPage=1; $("searchInput").value="";$("statusFilter").value="all";renderAppointments();
  showToast(`Appointment added for ${name}.`);
});
$("exportBtn").addEventListener("click",()=>{
  const rows=[["Patient","Patient ID","Appointment","Time","Provider","Check-in","Queue","Visit Status"],...filteredAppointments().map(a=>[a.name,a.patientId,a.type,a.time,a.provider,a.checkin,a.queue??"",a.status])];
  const csv=rows.map(row=>row.map(value=>`"${String(value).replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);
  const link=document.createElement("a");link.href=url;link.download="careflow-appointments.csv";document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
  showToast("Appointment report exported as CSV.");
});
$("mobileMenu").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-item").forEach(link=>link.addEventListener("click",()=>{$("sidebar").classList.remove("open");if(link.getAttribute("href")==="#queue")showToast("Queue status is available in today's appointments.");}));
$("helpBtn").addEventListener("click",()=>showToast("Help center: use search, filters, and row actions to manage visits."));
$("notificationBtn").addEventListener("click",()=>showToast("You're all caught up. No new notifications."));
$("flowPeriodBtn").addEventListener("click",()=>showToast("Showing today's patient flow."));
$("viewTeamBtn").addEventListener("click",()=>showToast("Care team workload is shown in this panel."));
renderAppointments();
