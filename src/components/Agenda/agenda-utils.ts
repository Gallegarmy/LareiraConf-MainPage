import agendaConfig from "@/i18n/agenda-config.es.json";

export function getAgendaByDay() {
  // Simulación: viernes previa y viernes evento (todo en viernes para este ejemplo)
  // En el futuro, si hay más días, se puede separar por fecha real
  // Aquí agrupamos todos los slots de ambos tracks en una sola lista para el viernes
  const allSlots = agendaConfig.tracks.flatMap(track => track.slots.map(slot => ({
    ...slot,
    track: track.label
  })));

  // Ejemplo: separar por tipo si se quiere, aquí todo es viernes
  return {
    viernesPrevia: allSlots.filter(slot => slot.category === "party" || slot.category === "registration"),
    viernesEvento: allSlots.filter(slot => slot.category !== "party" && slot.category !== "registration"),
  };
}
