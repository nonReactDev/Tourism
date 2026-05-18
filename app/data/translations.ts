export type TranslationCategory = 'greetings' | 'food' | 'directions' | 'emergency' | 'shopping';

export interface Phrase {
  id: string;
  category: TranslationCategory;
  english: string;
  spanish: string;
  pronunciation?: string;
}

export const categoryMeta: Record<TranslationCategory, { label: string; icon: string; color: string }> = {
  greetings: { label: 'Greetings', icon: '👋', color: '#4A90D9' },
  food: { label: 'Food & Drink', icon: '🍽️', color: '#FF6B6B' },
  directions: { label: 'Directions', icon: '🗺️', color: '#56AB2F' },
  emergency: { label: 'Emergency', icon: '🚨', color: '#E53E3E' },
  shopping: { label: 'Shopping', icon: '🛍️', color: '#F7971E' },
};

export const phrases: Phrase[] = [
  // Greetings
  { id: 't1', category: 'greetings', english: 'Hello!', spanish: '¡Hola!', pronunciation: 'OH-lah' },
  { id: 't2', category: 'greetings', english: 'Good morning', spanish: 'Buenos días', pronunciation: 'BWEH-nos DEE-as' },
  { id: 't3', category: 'greetings', english: 'Good evening', spanish: 'Buenas noches', pronunciation: 'BWEH-nas NO-ches' },
  { id: 't4', category: 'greetings', english: 'Thank you very much', spanish: 'Muchas gracias', pronunciation: 'MOO-chas GRA-syas' },
  { id: 't5', category: 'greetings', english: 'You\'re welcome', spanish: 'De nada', pronunciation: 'deh NA-dah' },
  { id: 't6', category: 'greetings', english: 'Please', spanish: 'Por favor', pronunciation: 'por fa-VOR' },
  { id: 't7', category: 'greetings', english: 'Nice to meet you', spanish: 'Mucho gusto', pronunciation: 'MOO-cho GOOS-toh' },
  { id: 't8', category: 'greetings', english: 'How are you?', spanish: '¿Cómo estás?', pronunciation: 'KO-mo es-TAS' },
  { id: 't9', category: 'greetings', english: 'See you later', spanish: 'Hasta luego', pronunciation: 'AS-tah LWEH-go' },

  // Food
  { id: 't10', category: 'food', english: 'A table for two, please', spanish: 'Una mesa para dos, por favor', pronunciation: 'OO-na MEH-sa PA-ra dos' },
  { id: 't11', category: 'food', english: 'The menu, please', spanish: 'La carta, por favor', pronunciation: 'la KAR-ta por fa-VOR' },
  { id: 't12', category: 'food', english: 'I would like...', spanish: 'Quisiera...', pronunciation: 'kee-SYEH-ra' },
  { id: 't13', category: 'food', english: 'What do you recommend?', spanish: '¿Qué recomienda?', pronunciation: 'keh reh-ko-MYEN-da' },
  { id: 't14', category: 'food', english: 'The check, please', spanish: 'La cuenta, por favor', pronunciation: 'la KWEN-ta por fa-VOR' },
  { id: 't15', category: 'food', english: 'It\'s delicious!', spanish: '¡Está delicioso!', pronunciation: 'es-TA deh-lee-SYOH-so' },
  { id: 't16', category: 'food', english: 'Do you have vegetarian options?', spanish: '¿Tienen opciones vegetarianas?', pronunciation: 'TYEH-nen op-SYOH-nes' },
  { id: 't17', category: 'food', english: 'I\'m allergic to...', spanish: 'Soy alérgico/a a...', pronunciation: 'soy ah-LER-hee-ko' },
  { id: 't18', category: 'food', english: 'More water, please', spanish: 'Más agua, por favor', pronunciation: 'mas AH-gwa por fa-VOR' },

  // Directions
  { id: 't19', category: 'directions', english: 'Where is...?', spanish: '¿Dónde está...?', pronunciation: 'DON-deh es-TA' },
  { id: 't20', category: 'directions', english: 'Turn left', spanish: 'Gire a la izquierda', pronunciation: 'HEE-reh ah la ees-KYEHR-da' },
  { id: 't21', category: 'directions', english: 'Turn right', spanish: 'Gire a la derecha', pronunciation: 'HEE-reh ah la deh-REH-cha' },
  { id: 't22', category: 'directions', english: 'Go straight', spanish: 'Siga recto', pronunciation: 'SEE-ga REK-to' },
  { id: 't23', category: 'directions', english: 'How far is it?', spanish: '¿A qué distancia está?', pronunciation: 'ah keh dees-TAN-sya es-TA' },
  { id: 't24', category: 'directions', english: 'I\'m lost', spanish: 'Estoy perdido/a', pronunciation: 'es-TOY per-DEE-do' },
  { id: 't25', category: 'directions', english: 'Can you help me?', spanish: '¿Puede ayudarme?', pronunciation: 'PWEH-deh ah-yoo-DAR-meh' },

  // Emergency
  { id: 't26', category: 'emergency', english: 'Help!', spanish: '¡Auxilio! / ¡Ayuda!', pronunciation: 'owk-SEE-lyo / ah-YOO-da' },
  { id: 't27', category: 'emergency', english: 'Call the police!', spanish: '¡Llame a la policía!', pronunciation: 'YAH-meh ah la po-lee-SEE-ah' },
  { id: 't28', category: 'emergency', english: 'I need a doctor', spanish: 'Necesito un médico', pronunciation: 'neh-seh-SEE-to oon MEH-dee-ko' },
  { id: 't29', category: 'emergency', english: 'Call an ambulance', spanish: 'Llame una ambulancia', pronunciation: 'YAH-meh oo-nah am-boo-LAN-sya' },
  { id: 't30', category: 'emergency', english: 'I\'ve been robbed', spanish: 'Me han robado', pronunciation: 'meh an ro-BA-do' },
  { id: 't31', category: 'emergency', english: 'Where is the hospital?', spanish: '¿Dónde está el hospital?', pronunciation: 'DON-deh es-TA el os-pee-TAL' },

  // Shopping
  { id: 't32', category: 'shopping', english: 'How much does it cost?', spanish: '¿Cuánto cuesta?', pronunciation: 'KWAN-to KWES-ta' },
  { id: 't33', category: 'shopping', english: 'That\'s too expensive', spanish: 'Es muy caro', pronunciation: 'es mooy KA-ro' },
  { id: 't34', category: 'shopping', english: 'Can you give me a discount?', spanish: '¿Me puede dar un descuento?', pronunciation: 'meh PWEH-deh dar oon des-KWEN-to' },
  { id: 't35', category: 'shopping', english: 'Do you have this in another size?', spanish: '¿Tiene esto en otra talla?', pronunciation: 'TYEH-neh ES-to en O-tra TA-ya' },
  { id: 't36', category: 'shopping', english: 'I\'ll take it', spanish: 'Me lo llevo', pronunciation: 'meh lo YEH-vo' },
  { id: 't37', category: 'shopping', english: 'Do you accept credit cards?', spanish: '¿Acepta tarjetas de crédito?', pronunciation: 'ah-SEP-ta tar-HEH-tas' },
  { id: 't38', category: 'shopping', english: 'Where is the restroom?', spanish: '¿Dónde está el baño?', pronunciation: 'DON-deh es-TA el BA-nyo' },
];
