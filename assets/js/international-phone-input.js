/* GymFlow reusable international phone input. Stores canonical E.164 values. */
(function () {
  const rawCountries = `Afghanistan|AF|93;Albania|AL|355;Algeria|DZ|213;American Samoa|AS|1684;Andorra|AD|376;Angola|AO|244;Anguilla|AI|1264;Antigua and Barbuda|AG|1268;Argentina|AR|54;Armenia|AM|374;Aruba|AW|297;Australia|AU|61;Austria|AT|43;Azerbaijan|AZ|994;Bahamas|BS|1242;Bahrain|BH|973;Bangladesh|BD|880;Barbados|BB|1246;Belarus|BY|375;Belgium|BE|32;Belize|BZ|501;Benin|BJ|229;Bermuda|BM|1441;Bhutan|BT|975;Bolivia|BO|591;Bosnia and Herzegovina|BA|387;Botswana|BW|267;Brazil|BR|55;British Virgin Islands|VG|1284;Brunei|BN|673;Bulgaria|BG|359;Burkina Faso|BF|226;Burundi|BI|257;Cambodia|KH|855;Cameroon|CM|237;Canada|CA|1;Cape Verde|CV|238;Cayman Islands|KY|1345;Central African Republic|CF|236;Chad|TD|235;Chile|CL|56;China|CN|86;Colombia|CO|57;Comoros|KM|269;Congo|CG|242;Cook Islands|CK|682;Costa Rica|CR|506;Croatia|HR|385;Cuba|CU|53;Cyprus|CY|357;Czechia|CZ|420;Denmark|DK|45;Djibouti|DJ|253;Dominica|DM|1767;Dominican Republic|DO|1809;Ecuador|EC|593;Egypt|EG|20;El Salvador|SV|503;Estonia|EE|372;Ethiopia|ET|251;Fiji|FJ|679;Finland|FI|358;France|FR|33;French Guiana|GF|594;French Polynesia|PF|689;Gabon|GA|241;Gambia|GM|220;Georgia|GE|995;Germany|DE|49;Ghana|GH|233;Gibraltar|GI|350;Greece|GR|30;Greenland|GL|299;Grenada|GD|1473;Guadeloupe|GP|590;Guam|GU|1671;Guatemala|GT|502;Guernsey|GG|44;Guinea|GN|224;Guyana|GY|592;Haiti|HT|509;Honduras|HN|504;Hong Kong|HK|852;Hungary|HU|36;Iceland|IS|354;India|IN|91;Indonesia|ID|62;Iran|IR|98;Iraq|IQ|964;Ireland|IE|353;Isle of Man|IM|44;Israel|IL|972;Italy|IT|39;Jamaica|JM|1876;Japan|JP|81;Jersey|JE|44;Jordan|JO|962;Kazakhstan|KZ|7;Kenya|KE|254;Kiribati|KI|686;Kosovo|XK|383;Kuwait|KW|965;Kyrgyzstan|KG|996;Laos|LA|856;Latvia|LV|371;Lebanon|LB|961;Lesotho|LS|266;Liberia|LR|231;Libya|LY|218;Liechtenstein|LI|423;Lithuania|LT|370;Luxembourg|LU|352;Macau|MO|853;Madagascar|MG|261;Malawi|MW|265;Malaysia|MY|60;Maldives|MV|960;Mali|ML|223;Malta|MT|356;Marshall Islands|MH|692;Martinique|MQ|596;Mauritania|MR|222;Mauritius|MU|230;Mayotte|YT|262;Mexico|MX|52;Micronesia|FM|691;Moldova|MD|373;Monaco|MC|377;Mongolia|MN|976;Montenegro|ME|382;Montserrat|MS|1664;Morocco|MA|212;Mozambique|MZ|258;Myanmar|MM|95;Namibia|NA|264;Nauru|NR|674;Nepal|NP|977;Netherlands|NL|31;New Caledonia|NC|687;New Zealand|NZ|64;Nicaragua|NI|505;Niger|NE|227;Nigeria|NG|234;Niue|NU|683;North Korea|KP|850;North Macedonia|MK|389;Norway|NO|47;Oman|OM|968;Pakistan|PK|92;Palau|PW|680;Palestine|PS|970;Panama|PA|507;Papua New Guinea|PG|675;Paraguay|PY|595;Peru|PE|51;Philippines|PH|63;Poland|PL|48;Portugal|PT|351;Puerto Rico|PR|1787;Qatar|QA|974;Reunion|RE|262;Romania|RO|40;Russia|RU|7;Rwanda|RW|250;Saint Barthelemy|BL|590;Saint Helena|SH|290;Saint Kitts and Nevis|KN|1869;Saint Lucia|LC|1758;Saint Martin|MF|590;Saint Pierre and Miquelon|PM|508;Saint Vincent and the Grenadines|VC|1784;Samoa|WS|685;San Marino|SM|378;Sao Tome and Principe|ST|239;Saudi Arabia|SA|966;Senegal|SN|221;Serbia|RS|381;Seychelles|SC|248;Sierra Leone|SL|232;Singapore|SG|65;Sint Maarten|SX|1721;Slovakia|SK|421;Slovenia|SI|386;Solomon Islands|SB|677;Somalia|SO|252;South Africa|ZA|27;South Korea|KR|82;South Sudan|SS|211;Spain|ES|34;Sri Lanka|LK|94;Sudan|SD|249;Suriname|SR|597;Sweden|SE|46;Switzerland|CH|41;Syria|SY|963;Taiwan|TW|886;Tajikistan|TJ|992;Tanzania|TZ|255;Thailand|TH|66;Timor-Leste|TL|670;Togo|TG|228;Tokelau|TK|690;Tonga|TO|676;Trinidad and Tobago|TT|1868;Tunisia|TN|216;Turkey|TR|90;Turkmenistan|TM|993;Turks and Caicos Islands|TC|1649;Tuvalu|TV|688;Uganda|UG|256;Ukraine|UA|380;United Arab Emirates|AE|971;United Kingdom|GB|44;United States|US|1;Uruguay|UY|598;Uzbekistan|UZ|998;Vanuatu|VU|678;Vatican City|VA|39;Venezuela|VE|58;Vietnam|VN|84;U.S. Virgin Islands|VI|1340;Yemen|YE|967;Zambia|ZM|260;Zimbabwe|ZW|263;Aland Islands|AX|358;Bonaire, Sint Eustatius and Saba|BQ|599;British Indian Ocean Territory|IO|246;Christmas Island|CX|61;Cocos (Keeling) Islands|CC|61;Curacao|CW|599;Falkland Islands|FK|500;Faroe Islands|FO|298;Norfolk Island|NF|672;Svalbard and Jan Mayen|SJ|47;Wallis and Futuna|WF|681;Western Sahara|EH|212`;
  const lengthOverrides = { IN: [10, 10], US: [10, 10], CA: [10, 10], GB: [9, 10], AU: [9, 9], NZ: [8, 10], CN: [11, 11], JP: [10, 10], KR: [9, 10], BR: [10, 11], MX: [10, 10], RU: [10, 10], KZ: [10, 10], SG: [8, 8], HK: [8, 8], AE: [9, 9], SA: [9, 9], PK: [10, 10], BD: [10, 10], LK: [9, 9], NP: [10, 10], ID: [9, 12], PH: [10, 10], MY: [9, 10], TH: [9, 9], VN: [9, 10], DE: [7, 12], FR: [9, 9], IT: [6, 11], ES: [9, 9], NL: [9, 9], BE: [8, 9], CH: [9, 9], ZA: [9, 9], NG: [10, 10], EG: [10, 10], IE: [7, 10], IL: [9, 9], TR: [10, 10], AR: [10, 11], CL: [9, 9], CO: [10, 10], PE: [9, 9], UA: [9, 9], SE: [7, 10], NO: [8, 8], DK: [8, 8], FI: [7, 10], PL: [9, 9], PT: [9, 9], GR: [10, 10], CZ: [9, 9], AT: [7, 13] };
  const countries = rawCountries.split(';').map(row => {
    const [name, iso, dial] = row.split('|');
    const [min, max] = lengthOverrides[iso] || [6, 12];
    return { name, iso, dial, min, max, flag: String.fromCodePoint(...[...iso].map(char => char.charCodeAt(0) + 127397)) };
  }).sort((a, b) => a.name.localeCompare(b.name));
  const defaultCountry = countries.find(country => country.iso === 'IN');
  const primaryIsoByDial = { '1': 'US', '7': 'RU', '39': 'IT', '44': 'GB', '590': 'GP', '262': 'RE' };
  const instances = new WeakMap();

  function digits(value) { return String(value || '').replace(/\D/g, ''); }
  function normalizeDial(value) { return digits(value).replace(/^00/, ''); }

  function parseValue(value, preferredDial, preferredIso) {
    const raw = String(value || '').trim();
    const allDigits = digits(raw);
    if (raw.startsWith('+') || raw.startsWith('00')) {
      const internationalDigits = raw.startsWith('00') ? allDigits.slice(2) : allDigits;
      const matchingDial = [...new Set(countries.map(item => item.dial))].sort((a, b) => b.length - a.length).find(dial => internationalDigits.startsWith(dial));
      const candidates = matchingDial ? countries.filter(item => item.dial === matchingDial) : [];
      const country = candidates.find(item => item.iso === preferredIso) || candidates.find(item => item.iso === primaryIsoByDial[matchingDial]) || candidates[0];
      if (country) return { country, national: internationalDigits.slice(country.dial.length) };
    }
    const dial = normalizeDial(preferredDial);
    const country = countries.find(item => item.dial === dial) || defaultCountry;
    let national = allDigits;
    if (dial && national.startsWith(dial) && national.length > country.max) national = national.slice(dial.length);
    return { country, national };
  }

  function validNational(country, national) {
    const value = digits(national);
    return value.length >= country.min && value.length <= country.max;
  }

  function makeWrapper(input) {
    if (instances.has(input)) return instances.get(input);
    const originalParent = input.parentNode;
    if (originalParent?.classList.contains('input-with-icon')) originalParent.classList.add('has-intl-phone');
    const outer = document.createElement('div');
    outer.className = 'intl-phone-input';
    const picker = document.createElement('div');
    picker.className = 'intl-phone-picker';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'intl-phone-country';
    trigger.setAttribute('aria-label', 'Select country calling code');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span');
    label.className = 'intl-phone-country-label';
    const arrow = document.createElement('i');
    arrow.className = 'fa-solid fa-chevron-down';
    arrow.setAttribute('aria-hidden', 'true');
    trigger.append(label, arrow);
    const menu = document.createElement('div');
    menu.className = 'intl-phone-menu';
    menu.hidden = true;
    const searchWrap = document.createElement('div');
    searchWrap.className = 'intl-phone-search-wrap';
    const search = document.createElement('input');
    search.type = 'search';
    search.className = 'intl-phone-search';
    search.placeholder = 'Search country or code';
    search.setAttribute('aria-label', 'Search countries');
    searchWrap.append(search);
    const list = document.createElement('div');
    list.className = 'intl-phone-options';
    list.setAttribute('role', 'listbox');
    menu.append(searchWrap, list);
    picker.append(trigger, menu);
    input.parentNode.insertBefore(outer, input);
    outer.append(picker, input);
    input.classList.add('intl-phone-national');
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('autocomplete', input.autocomplete || 'tel-national');
    input.setAttribute('aria-label', input.getAttribute('aria-label') || 'Phone number');

    const state = { input, outer, picker, trigger, label, menu, search, list, country: defaultCountry };
    instances.set(input, state);
    const updateLabel = () => {
      label.innerHTML = `<span class="intl-phone-flag" aria-hidden="true">${state.country.flag}</span><span class="intl-phone-dial">+${state.country.dial}</span>`;
      trigger.title = `${state.country.name} (+${state.country.dial})`;
      trigger.setAttribute('aria-label', `Country: ${state.country.name}, calling code +${state.country.dial}`);
      input.dataset.countryCode = `+${state.country.dial}`;
      input.dataset.countryIso = state.country.iso;
    };
    const updateValidity = () => {
      const national = digits(input.value);
      if (!national && !input.required) input.setCustomValidity('');
      else if (!national) input.setCustomValidity('Enter a phone number.');
      else if (!validNational(state.country, national)) input.setCustomValidity(`Enter a valid ${state.country.name} phone number (${state.country.min}${state.country.max !== state.country.min ? `–${state.country.max}` : ''} digits).`);
      else input.setCustomValidity('');
    };
    const drawOptions = (query = '') => {
      const term = query.trim().toLowerCase();
      const dialQuery = digits(term);
      const matches = countries.filter(country => !term || country.name.toLowerCase().includes(term) || (dialQuery && country.dial.includes(dialQuery)) || country.iso.toLowerCase() === term);
      list.innerHTML = matches.length ? matches.map(country => `<button type="button" class="intl-phone-option${country.iso === state.country.iso ? ' is-selected' : ''}" role="option" aria-selected="${country.iso === state.country.iso}" data-country="${country.iso}"><span class="intl-phone-option-flag">${country.flag}</span><span class="intl-phone-option-name">${country.name}</span><span class="intl-phone-option-dial">+${country.dial}</span></button>`).join('') : '<div class="intl-phone-no-results">No countries found</div>';
    };
    const close = () => { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
    trigger.addEventListener('click', () => {
      const open = menu.hidden;
      document.querySelectorAll('.intl-phone-menu:not([hidden])').forEach(other => { other.hidden = true; other.closest('.intl-phone-picker')?.querySelector('.intl-phone-country')?.setAttribute('aria-expanded', 'false'); });
      menu.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
      if (open) { search.value = ''; drawOptions(); search.focus(); }
    });
    search.addEventListener('input', () => drawOptions(search.value));
    list.addEventListener('click', event => {
      const option = event.target.closest('[data-country]');
      if (!option) return;
      state.country = countries.find(country => country.iso === option.dataset.country) || defaultCountry;
      updateLabel(); updateValidity(); close(); input.focus();
      input.dispatchEvent(new Event('countrychange', { bubbles: true }));
    });
    input.addEventListener('input', updateValidity);
    input.addEventListener('blur', updateValidity);
    document.addEventListener('click', event => { if (!outer.contains(event.target)) close(); });
    updateLabel();
    drawOptions();
    return state;
  }

  function getState(inputOrId) {
    const input = typeof inputOrId === 'string' ? document.getElementById(inputOrId) : inputOrId;
    return input ? makeWrapper(input) : null;
  }

  function setValue(inputOrId, value, countryCode, countryIso) {
    const state = getState(inputOrId);
    if (!state) return;
    const parsed = parseValue(value, countryCode, countryIso);
    state.country = parsed.country;
    state.input.value = parsed.national;
    state.label.innerHTML = `<span class="intl-phone-flag" aria-hidden="true">${state.country.flag}</span><span class="intl-phone-dial">+${state.country.dial}</span>`;
    state.trigger.title = `${state.country.name} (+${state.country.dial})`;
    state.trigger.setAttribute('aria-label', `Country: ${state.country.name}, calling code +${state.country.dial}`);
    state.input.dataset.countryCode = `+${state.country.dial}`;
    state.input.dataset.countryIso = state.country.iso;
    state.input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function getParts(inputOrId) {
    const state = getState(inputOrId);
    if (!state) return { countryCode: '+91', countryIso: 'IN', nationalNumber: '', phone: '' };
    const national = digits(state.input.value);
    return { countryCode: `+${state.country.dial}`, countryIso: state.country.iso, nationalNumber: national, phone: national ? `+${state.country.dial}${national}` : '' };
  }

  function format(value, countryCode) {
    if (!value) return '';
    const { country, national } = parseValue(value, countryCode);
    const chunks = country.iso === 'IN' && national.length === 10 ? `${national.slice(0, 5)} ${national.slice(5)}`
      : country.iso === 'US' || country.iso === 'CA' ? (national.length === 10 ? `(${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6)}` : national)
      : national.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    return `+${country.dial}${chunks ? ` ${chunks}` : ''}`;
  }

  function init(root = document) {
    root.querySelectorAll('input[type="tel"]').forEach(input => {
      const oldValue = input.value;
      const oldCode = input.dataset.countryCode || '';
      makeWrapper(input);
      if (oldValue) setValue(input, oldValue, oldCode);
    });
  }

  document.addEventListener('DOMContentLoaded', () => init());
  document.addEventListener('submit', event => {
    const inputs = [...event.target.querySelectorAll('input.intl-phone-national')];
    const invalid = inputs.find(input => !input.checkValidity());
    if (invalid) { event.preventDefault(); invalid.reportValidity(); }
  }, true);

  window.IntlPhoneInput = { countries, init, setValue, getParts, getValue: input => getParts(input).phone, format, parseValue };
})();
