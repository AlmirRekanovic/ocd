// Client-safe WhatsApp link helpers. Country code is passed in explicitly so
// this module can be imported from client components.

export function toWhatsappNumber(phone: string, countryCode: string): string {
  let digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return countryCode + digits.slice(1);
  if (digits.startsWith(countryCode)) return digits;
  return countryCode + digits;
}

export function credentialsMessage(
  name: string,
  username: string,
  password: string
): string {
  return (
    `Zdravo ${name}! Dobrodošao/la u OCD Fighters. ` +
    `Tvoji podaci za prijavu:\n` +
    `Korisničko ime: ${username}\n` +
    `Lozinka: ${password}\n` +
    `Prijava: prijavi se na našoj stranici u dijelu "Članski dio".`
  );
}

/** Manual (click-to-send) membership reminder. `validUntil` is already formatted. */
export function membershipReminderMessage(
  name: string,
  validUntil: string | null,
  expired: boolean
): string {
  if (!validUntil) {
    return `Zdravo ${name}! Podsjetnik iz OCD Fighters: članarina još nije uplaćena. Hvala!`;
  }
  return expired
    ? `Zdravo ${name}! Podsjetnik iz OCD Fighters: tvoja članarina je istekla ${validUntil} Molimo te da je obnoviš. Hvala!`
    : `Zdravo ${name}! Podsjetnik iz OCD Fighters: tvoja članarina ističe ${validUntil} Molimo te da je obnoviš na vrijeme. Hvala!`;
}

export function whatsappLink(
  phone: string,
  message: string,
  countryCode: string
): string {
  return `https://wa.me/${toWhatsappNumber(phone, countryCode)}?text=${encodeURIComponent(
    message
  )}`;
}
