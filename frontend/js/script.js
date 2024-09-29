// frontend/js/script.js

let debounceTimeout;

// Mapeamento completo das chegadas e saídas para cada pista e suas transições
const departuresMap = {
    'SBGR': {
        '10L': [
            { departure: 'AMVUL 4A', transitions: ['AMVUL', 'VUMEV', 'NUXEL', 'UKBEV'] },
            { departure: 'EDLUT 1A', transitions: ['EDLUT', 'VUMEV', 'UKBEV'] },
            { departure: 'EKOPO 1A', transitions: ['EKOPO', 'NIBRU', 'UREMI'] },
            { departure: 'UKBEV 2D', transitions: ['GERTU', 'UKBEV'] },
            { departure: 'ZORZA 2A', transitions: ['ZORZA', 'MADNI', 'UBSOD', 'SOVSI', 'ASETA', 'EGEVA', 'GERTU'] },
        ],
        '10R': [
            { departure: 'CGO 2A', transitions: ['CGO', 'MADNI', 'UBSOD', 'NIBGA', 'SOVSI', 'ASETA', 'EGEVA', 'GERTU'] },
            { departure: 'NIBRU 2A', transitions: ['NIBRU'] },
            { departure: 'REORI 2A', transitions: ['REORI', 'VUMEV', 'NUXEL', 'UKBEV'] },
            { departure: 'UREMI 2A', transitions: ['UREMI'] },
        ],
        '28L': [
            { departure: 'AKRER 1A', transitions: ['AKRER', 'MADNI', 'UBSOD', 'SOVSI', 'ASETA', 'EGEVA'] },
            { departure: 'CGO 2B', transitions: ['CGO', 'MADNI', 'UBSOD', 'NIBGA', 'SOVSI', 'ASETA', 'EGEVA', 'GERTU'] },
            { departure: 'EVNEB 2A', transitions: ['EVNEB', 'NIBRU', 'UREMI', 'VUMEV', 'NUXEL'] },
            { departure: 'GERTU 1A', transitions: ['GERTU'] },
            { departure: 'OMNI', transitions: ['OMNI'] },
        ],
        '28R': [
            { departure: 'AKRER 1A', transitions: ['AKRER', 'MADNI', 'UBSOD', 'SOVSI', 'ASETA', 'EGEVA'] },
            { departure: 'CGO 2B', transitions: ['CGO', 'MADNI', 'UBSOD', 'NIBGA', 'SOVSI', 'ASETA', 'EGEVA', 'GERTU'] },
            { departure: 'EVNEB 2A', transitions: ['EVNEB', 'NIBRU', 'UREMI', 'VUMEV', 'NUXEL'] },
            { departure: 'GERTU 1A', transitions: ['GERTU'] },
            { departure: 'ISNAP 1A', transitions: ['ISNAP', 'NIBRU', 'UREMI', 'VUMEV', 'NUXEL'] },
            { departure: 'UKBEV 3E', transitions: ['UKBEV'] },
            { departure: 'ZORZA 4B', transitions: ['ZORZA', 'MADNI', 'UBSOD', 'SOVSI', 'GERTU', 'ASETA', 'EGEVA'] },
            { departure: 'OMNI', transitions: ['OMNI'] },
        ],
    },
    'SBSP': {
        '17R': [
            { departure: 'BAIAN 2A', transitions: ['BAIAN', 'NIBRU', 'UREMI', 'VUMEV', 'NUXEL'] },
            { departure: 'LESSA 1A', transitions: ['LESSA', 'ASETA', 'EGEVA'] },
            { departure: 'UGTIX 2A', transitions: ['UGTIX', 'GERTU', 'EGEVA', 'ASETA'] },
            { departure: 'UTKOM 1A', transitions: ['UTKOM', 'SOVSI', 'NIBGA', 'UBSOD', 'MADNI'] },
        ],
        '17L': [
            { departure: 'BAIAN 2A', transitions: ['BAIAN', 'NIBRU', 'UREMI', 'VUMEV', 'NUXEL'] },
            { departure: 'LESSA 1A', transitions: ['LESSA', 'ASETA', 'EGEVA'] },
            { departure: 'UGTIX 2A', transitions: ['UGTIX', 'GERTU', 'EGEVA', 'ASETA'] },
            { departure: 'UTKOM 1A', transitions: ['UTKOM', 'SOVSI', 'NIBGA', 'UBSOD', 'MADNI'] },
        ],
        '35L': [
            { departure: 'BAIAN 2B', transitions: ['BAIAN', 'NIBRU', 'UREMI', 'VUMEV', 'NUXEL'] },
            { departure: 'LESSA 1B', transitions: ['LESSA', 'ASETA', 'EGEVA'] },
            { departure: 'SEDLO 1A', transitions: ['SEDLO', 'NIBGA', 'UBSOD', 'MADNI'] },
            { departure: 'UGTIX 1B', transitions: ['UGTIX', 'GERTU', 'EGEVA', 'ASETA'] },
        ],
        '35R': [
            { departure: 'BAIAN 2B', transitions: ['BAIAN', 'NIBRU', 'UREMI', 'VUMEV', 'NUXEL'] },
            { departure: 'LESSA 1B', transitions: ['LESSA', 'ASETA', 'EGEVA'] },
            { departure: 'SEDLO 1A', transitions: ['SEDLO', 'NIBGA', 'UBSOD', 'MADNI'] },
            { departure: 'UGTIX 1B', transitions: ['UGTIX', 'GERTU', 'EGEVA', 'ASETA'] },
        ],
    },
};

// Mapeamento das chegadas (STARs)
const arrivalsMap = {
    'SBGR': {
        '10L': [
            { arrival: 'EDMUS 1A', transitions: ['EDMUS'] },
            { arrival: 'EVRAL 1A', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'EVRAL 1D', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'SANPA 1A', transitions: ['VUNOX'] },
            { arrival: 'VUNOX 1A', transitions: ['VUNOX'] },
        ],
        '10R': [
            { arrival: 'EDMUS 1A', transitions: ['EDMUS'] },
            { arrival: 'EVRAL 1A', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'EVRAL 1D', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'SANPA 1A', transitions: ['VUNOX'] },
            { arrival: 'VUNOX 1A', transitions: ['VUNOX'] },
        ],
        '28L': [
            { arrival: 'EDMUS 1B', transitions: ['EDMUS'] },
            { arrival: 'EVRAL 1B', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'EVRAL 1C', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'VUNOX 1B', transitions: ['VUNOX'] },
            { arrival: 'VUNOX 1C', transitions: ['VUNOX'] },
        ],
        '28R': [
            { arrival: 'EDMUS 1B', transitions: ['EDMUS'] },
            { arrival: 'EVRAL 1B', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'EVRAL 1C', transitions: ['ZARES', 'BUXUK'] },
            { arrival: 'VUNOX 1B', transitions: ['VUNOX'] },
            { arrival: 'VUNOX 1C', transitions: ['VUNOX'] },
        ],
    },
    // Se houver chegadas para SBSP, adicione aqui
};

// Mapeamento das transições para suas respectivas aerovias (para SIDs)
const transitionToAerovias = {
    // Transições existentes
    'VUMEV': ['UZ14'],
    'NUXEL': ['UZ23'],
    'UKBEV': ['UZ26'],
    'MADNI': ['UZ92'],
    'UBSOD': ['UZ45', 'UZ38'],
    'SOVSI': ['UZ85'],
    'ASETA': ['UM415', 'UZ152'],
    'EGEVA': ['UM415'],
    'GERTU': ['UM775', 'UM417', 'UM423', 'UL304', 'UL201'],
    'NIBRU': ['UZ171'],
    'UREMI': ['UZ42'],
    // Novas transições de SBSP
    'BAIAN': ['UZ171'],
    'LESSA': ['UM415', 'UZ152'],
    'UGTIX': ['UM775', 'UM417', 'UM423', 'UL304', 'UL201'],
    'UTKOM': ['UZ85'],
    'SEDLO': ['UZ45', 'UZ38'],
};

// Ordem desejada das pistas para exibição
const runwayOrder = ['17R', '17L', '35L', '35R', '10L', '10R', '28L', '28R'];

// Função para determinar as rotas (SIDs ou STARs) com base na pista, transição e mapa fornecido
function determineRoutes(aerodrome, runway, transition, map) {
    if (!map[aerodrome] || !map[aerodrome][runway]) {
        return [];
    }

    // Filtrar as rotas que incluem a transição fornecida
    return map[aerodrome][runway]
        .filter(route => route.transitions.includes(transition)) // Filtra as rotas que têm a transição
        .map(route => route.departure || route.arrival); // Retorna a SID ou STAR encontrada
}

function createOutputBox(runway, routes, aerovias = [], type = 'SID', color = 'blue') {
    const outputContainer = document.getElementById('output');

    const box = document.createElement('div');
    box.classList.add('output-box');

    // Define a cor da borda com base no tipo (SID/STAR)
    box.style.borderColor = color;

    // Informações da pista e rotas no lado esquerdo
    const leftInfo = document.createElement('div');
    leftInfo.classList.add('left-info');

    const runwayInfo = document.createElement('span');
    runwayInfo.textContent = `Pista ${runway}: ${routes.join(' & ')}`;
    runwayInfo.style.fontWeight = 'bold';
    leftInfo.appendChild(runwayInfo);

    // Exibir as aerovias associadas, se houver
    if (aerovias.length > 0) {
        const aeroviaInfo = document.createElement('div');
        aeroviaInfo.textContent = `Aerovia(s): ${aerovias.join(', ')}`;
        leftInfo.appendChild(aeroviaInfo);
    }

    // Label do tipo (SID/STAR) no canto superior direito
    const typeLabel = document.createElement('span');
    typeLabel.textContent = type;
    typeLabel.classList.add('type-label');
    typeLabel.style.color = color;

    // Adiciona os elementos à caixa
    box.appendChild(leftInfo);
    box.appendChild(typeLabel);
    outputContainer.appendChild(box);
}

// Evento de input com debounce para evitar requisições excessivas
document.getElementById('icaoInput').addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(handleSearch, 500); // Aguarda 500ms após a última tecla
});

// Função principal para lidar com a busca e exibição das saídas e chegadas
async function handleSearch() {
    const input = document.getElementById('icaoInput').value.trim().toUpperCase();
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = ''; // Limpa a exibição anterior

    if (!input) {
        // Não exibe mensagem de erro quando o campo está vazio
        return;
    }

    const [icao, transitionFull] = input.split(' ');
    if (!icao || !transitionFull) {
        // Não exibe mensagem de erro enquanto ainda está digitando
        return;
    }

    // Remover sufixos da transição, se existirem (ex: 'UKBEV.1' -> 'UKBEV')
    const transition = transitionFull.split('.')[0];

    const validAerodromes = ['SBGR', 'SBSP'];
    if (!validAerodromes.includes(icao)) {
        createOutputBox(null, ['Aeroporto não encontrado. Utilize SBGR ou SBSP.'], 'Erro', 'red');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/metar`); // Certifique-se de que o backend está rodando
        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }
        const data = await response.json();
        const windInfo = data.wind_direction && data.wind_speed ? { dir: data.wind_direction.value, speed: data.wind_speed.value } : null;
        if (!windInfo) throw new Error('Informações de vento não disponíveis no METAR.');

        // Aplicar declinação magnética de 20 graus
        let wind_dir_mag = (windInfo.dir + 20) % 360;

        // Arredondar para a dezena mais próxima
        wind_dir_mag = Math.round(wind_dir_mag / 10) * 10;
        const wind_speed = windInfo.speed;

        let runwaysInUse = [];

        if (icao === 'SBGR') {
            // Definir as pistas e seus rumos magnéticos
            const runways = {
                '10L': 100,
                '10R': 100,
                '28L': 280,
                '28R': 280,
            };

            const componentes = {};

            for (const [runway, dir] of Object.entries(runways)) {
                let difference = wind_dir_mag - dir;
                if (difference > 180) {
                    difference -= 360;
                } else if (difference < -180) {
                    difference += 360;
                }

                const radians = difference * (Math.PI / 180);
                const componente_cauda = wind_speed * Math.cos(radians);
                componentes[runway] = componente_cauda;

                console.log(`Pista ${runway}: Componente de Vento de Cauda = ${componente_cauda.toFixed(2)}kt`);
            }

            // Verificar se as pistas 10L/10R têm componente de vento de cauda menor que 6 nós
            const compCauda10 = Math.max(componentes['10L'], componentes['10R']);
            if (compCauda10 < 6) {
                runwaysInUse.push('10L', '10R');
            } else {
                // Comparar os componentes de vento de cauda das pistas 28L/28R
                const compCauda28 = Math.max(componentes['28L'], componentes['28R']);

                // Escolher as pistas com menor componente de vento de cauda
                if (compCauda28 <= compCauda10) {
                    runwaysInUse.push('28L', '28R');
                } else {
                    runwaysInUse.push('10L', '10R');
                }
            }
        } else if (icao === 'SBSP') {
            // Lógica específica para SBSP permanece a mesma
            if (wind_dir_mag >= 0 && wind_dir_mag <= 179) {
                runwaysInUse.push('17L', '17R');
            } else {
                runwaysInUse.push('35L', '35R');
            }
        }

        console.log('Pistas em Uso:', runwaysInUse);

        // Obter as saídas correspondentes à transição para as pistas em uso
        let departuresByRunway = {};
        let arrivalsByRunway = {};

        runwaysInUse.forEach(runway => {
            // Determinar saídas (SIDs)
            const departures = determineRoutes(icao, runway, transition, departuresMap);
            if (departures.length > 0) {
                departuresByRunway[runway] = departures;
            }

            // Determinar chegadas (STARs)
            const arrivals = determineRoutes(icao, runway, transition, arrivalsMap);
            if (arrivals.length > 0) {
                arrivalsByRunway[runway] = arrivals;
            }
        });

        // Obter aerovias para a transição (apenas para SIDs)
        const aerovias = transitionToAerovias[transition] || [];

        // Verificar se há chegadas ou saídas correspondentes
        if (Object.keys(departuresByRunway).length > 0 || Object.keys(arrivalsByRunway).length > 0) {
            // Ordenar as pistas conforme runwayOrder
            const sortedRunwaysInUse = runwayOrder.filter(runway => runwaysInUse.includes(runway));

            sortedRunwaysInUse.forEach(runway => {
                // Exibir chegadas (STARs) primeiro
                if (arrivalsByRunway[runway]) {
                    const aeroviasArrival = []; // No momento, não temos aerovias para STARs
                    createOutputBox(runway, arrivalsByRunway[runway], aeroviasArrival, 'STAR', 'purple');
                }
                // Exibir saídas (SIDs)
                if (departuresByRunway[runway]) {
                    const aerovias = transitionToAerovias[transition] || [];
                    createOutputBox(runway, departuresByRunway[runway], aerovias, 'SID', 'blue');
                }
            });
        } else {
            createOutputBox(null, ['Nenhuma saída ou chegada encontrada para a transição fornecida nas pistas em uso.'], 'Erro', 'red');
        }
    } catch (error) {
        console.error(error);
        createOutputBox(null, ['Erro ao processar dados METAR.'], 'Erro', 'red');
    }
}

// ===================
// Funções para ATIS
// ===================

// Função para calcular o Transition Level com base no QNH
function calculateTransitionLevel(qnh) {
    let transitionLevel;

    if (qnh >= 942.2 && qnh <= 959.4) {
        transitionLevel = 'FL105';
    } else if (qnh >= 959.5 && qnh <= 977.1) {
        transitionLevel = 'FL100';
    } else if (qnh >= 977.2 && qnh <= 995.0) {
        transitionLevel = 'FL095';
    } else if (qnh >= 995.1 && qnh <= 1013.2) {
        transitionLevel = 'FL090';
    } else if (qnh >= 1013.3 && qnh <= 1031.6) {
        transitionLevel = 'FL085';
    } else if (qnh >= 1031.7 && qnh <= 1050.3) {
        transitionLevel = 'FL080';
    } else {
        transitionLevel = 'N/A';
    }

    // Para QNH inteiros específicos, considerar o maior Transition Level
    const qnhInt = Math.round(qnh);
    if ([959, 977, 995, 1013, 1031].includes(qnhInt)) {
        switch (qnhInt) {
            case 959:
                transitionLevel = 'FL105';
                break;
            case 977:
                transitionLevel = 'FL100';
                break;
            case 995:
                transitionLevel = 'FL095';
                break;
            case 1013:
                transitionLevel = 'FL090';
                break;
            case 1031:
                transitionLevel = 'FL085';
                break;
            default:
                break;
        }
    }

    return transitionLevel;
}

function calculateTailwindComponent(icao, windDirection, runway, windSpeed) {
    // Map of runways to their magnetic headings
    const runwayHeadings = {
        'SBGR': {
            '10L': 100,
            '10R': 100,
            '28L': 280,
            '28R': 280,
        },
        // Add mappings for other airports if needed
    };

    if (!runwayHeadings[icao] || !runwayHeadings[icao][runway]) {
        console.warn(`Runway heading for ${icao} runway ${runway} not found.`);
        return null;
    }

    const runwayHeading = runwayHeadings[icao][runway];

    // Calculate the angle between the wind and the runway
    let theta = windDirection - runwayHeading;
    if (theta > 180) theta -= 360;
    if (theta < -180) theta += 360;

    // Calculate the tailwind component
    const tailwindComponent = windSpeed * Math.cos(theta * Math.PI / 180);

    return tailwindComponent;
}

// Function to generate the ATIS with runway conditions and segregated operations/RRSM
async function generateATIS() {
    try {
        // Fetch METAR data for SBGR
        const responseSBGR = await fetch(`http://localhost:3000/api/metar?icao=SBGR`);
        if (!responseSBGR.ok) {
            throw new Error(`Error in SBGR METAR API response: ${responseSBGR.statusText}`);
        }
        const dataSBGR = await responseSBGR.json();
        console.log('METAR data for SBGR:', dataSBGR);

        // Extract QNH from the METAR data
        const qnh = dataSBGR.altimeter?.value || null;
        if (!qnh) throw new Error('QNH não disponível no METAR.');

        const transitionLevel = calculateTransitionLevel(qnh);
        const transitionAltitude = '8000 FT';

        // Set DEPARTURE and ARRIVAL runways for SBGR
        const sbgrDeparture = '10L';
        const sbgrArrival = '10R ILS Y';

        // Fetch wind, visibility, and cloud ceiling data for SBGR
        const windDirection = dataSBGR.wind?.direction?.value || null;
        const windSpeed = dataSBGR.wind?.speed?.value || null;
        const visibility = dataSBGR.visibility?.value || null;

        // Check if wind data is available
        if (windDirection === null || windSpeed === null) {
            throw new Error('Dados de vento não disponíveis no METAR.');
        }

        // Calculate tailwind component for SBGR runway 10L
        const tailwindComponent = calculateTailwindComponent('SBGR', windDirection, '10L', windSpeed);

        // Function to get the lowest cloud base
        function getLowestCloudBase(clouds) {
            if (!clouds || clouds.length === 0) {
                return null;
            }

            let lowestBase = null;
            clouds.forEach(cloud => {
                if (cloud.base && (lowestBase === null || cloud.base < lowestBase)) {
                    lowestBase = cloud.base;
                }
            });

            return lowestBase;
        }

        // Get cloud ceiling for SBGR
        const cloudCeiling = getLowestCloudBase(dataSBGR.clouds);

        // Check if the conditions for SEGREGATED OPERATIONS IN PROGRESS are met
        const visibilityOk = visibility >= 5000; // Visibility in meters
        const ceilingOk = cloudCeiling >= 1000; // Ceiling in feet

        // Determine if it's daytime (between 0330 UTC and 2030 UTC)
        const now = new Date();
        const currentUTCHour = now.getUTCHours();
        const currentUTCMinutes = now.getUTCMinutes();
        const currentUTC = currentUTCHour + currentUTCMinutes / 60;
        const isDaytime = currentUTC >= 3.5 && currentUTC < 20.5;

        // Conditions for RRSM
        const tailwindOk = tailwindComponent !== null && tailwindComponent <= 3;

        // Build REMARKS
        let remarks = '';

        if (visibilityOk && ceilingOk) {
            remarks += 'SBGR (SEGREGATED OPERATIONS IN PROGRESS)';
            if (isDaytime && tailwindOk) {
                remarks += ' and Reduced Runway Separation Minima (RRSM)';
            }
        }

        // Fetch METAR data for other airports
        const icaos = ['SBSP', 'SBKP', 'SBSJ', 'SBMT'];
        const metarData = {};

        for (const icao of icaos) {
            const response = await fetch(`http://localhost:3000/api/metar?icao=${icao}`);
            if (!response.ok) {
                console.warn(`Erro na resposta da API METAR ${icao}: ${response.statusText}`);
                metarData[icao] = null; // Assign null if fetch fails
            } else {
                metarData[icao] = await response.json();
            }
        }

        // Now, call determineRunwaysInUse for each airport with correct METAR data
        const sbspRunwaysInUse = metarData['SBSP'] ? determineRunwaysInUse('SBSP', metarData['SBSP'], currentUTCHour) : [];
        const sbkpRunwaysInUse = metarData['SBKP'] ? determineRunwaysInUse('SBKP', metarData['SBKP'], currentUTCHour) : [];
        const sbsjRunwaysInUse = metarData['SBSJ'] ? determineRunwaysInUse('SBSJ', metarData['SBSJ'], currentUTCHour) : [];
        const sbmtRunwaysInUse = metarData['SBMT'] ? determineRunwaysInUse('SBMT', metarData['SBMT'], currentUTCHour) : [];

        // Get preferred approaches for other airports
        const sbspIAP = getPreferredApproach('SBSP', sbspRunwaysInUse);
        const sbkpIAP = getPreferredApproach('SBKP', sbkpRunwaysInUse);
        const sbsjIAP = getPreferredApproach('SBSJ', sbsjRunwaysInUse);
        const sbmtIAP = getPreferredApproach('SBMT', sbmtRunwaysInUse);

        // Build the ATIS string
        let atis = '';
        atis += `ATC POSITION: Sao Paulo Control\n`;
        atis += `ATIS ACTIVE: Marcado\n`;
        atis += `METAR STATION: SBGR\n`;
        atis += `ARRIVAL: ${sbgrArrival}\n`;
        atis += `DEPARTURE: ${sbgrDeparture}\n`;
        atis += `TRANSITION LEVEL: ${transitionLevel}\n`;
        atis += `TRANSITION ALTITUDE: ${transitionAltitude}\n`;

        // Add remarks if applicable
        if (remarks) {
            atis += `RMK: ${remarks}\n`;
        }

        // Include information for SBSP, SBKP, SBSJ, and SBMT
        let aerodromeInfo = '';

        // Function to format aerodrome info
        function formatAerodromeInfo(icao, runwaysInUse, iap) {
            if (runwaysInUse.length === 0) return '';
            const departures = runwaysInUse.filter(r => r.startsWith('T-')).map(r => r.replace('T-', '')).join('/');
            const arrivals = runwaysInUse.filter(r => r.startsWith('L-')).map(r => r.replace('L-', '')).join('/');
            const iapInfo = iap ? ` (${iap})` : '';
            return `${icao} T-${departures} / L-${arrivals}${iapInfo}`;
        }

        const sbspFormatted = formatAerodromeInfo('SBSP', sbspRunwaysInUse, sbspIAP);
        const sbkpFormatted = formatAerodromeInfo('SBKP', sbkpRunwaysInUse, sbkpIAP);
        const sbsjFormatted = formatAerodromeInfo('SBSJ', sbsjRunwaysInUse, sbsjIAP);
        const sbmtFormatted = formatAerodromeInfo('SBMT', sbmtRunwaysInUse, sbmtIAP);

        // Concatenate aerodrome info
        aerodromeInfo = [sbspFormatted, sbkpFormatted, sbsjFormatted, sbmtFormatted]
            .filter(info => info !== '')
            .join(' | ');

        atis += aerodromeInfo;

        // Display the ATIS on the interface
        displayATIS(atis);

    } catch (error) {
        console.error('Error generating ATIS:', error);
        alert('Erro ao gerar o ATIS.');
    }
}

// Add event listener to generate ATIS when needed
document.getElementById('generateAtisButton').addEventListener('click', generateATIS);

// Adicionando um botão de nuvem para puxar todos os METARs
document.getElementById('metarButton').addEventListener('click', async () => {
    const metarContainer = document.getElementById('metarContainer');
    
    // Toggle the display of the container
    if (metarContainer.style.display === 'none' || metarContainer.style.display === '') {
        metarContainer.style.display = 'block';
    } else {
        metarContainer.style.display = 'none';
        return; // If hiding, don't fetch METARs
    }

    // List of airports to fetch METARs for
    const airports = ['SBGR', 'SBSP', 'SBKP', 'SBSJ', 'SBMT'];

    // Clear the METAR container before adding new data
    metarContainer.innerHTML = '<h3>METARs:</h3>';

    try {
        // For each airport, make a request to the API to get the METAR
        for (let airport of airports) {
            const response = await fetch(`http://localhost:3000/api/metar?icao=${airport}`);
            
            if (response.ok) {
                const metarData = await response.json();
                console.log(`METAR data for ${airport}:`, metarData); // Added for debugging

                // Adjust according to the structure of the API response
                const metar = metarData.metar || metarData.raw || metarData.raw_metar || (metarData.data && metarData.data.raw_text) || 'Dados não disponíveis';

                const metarText = `
                    <div>
                        <strong>${airport}:</strong> ${metar}
                    </div>`;
                metarContainer.innerHTML += metarText; // Add METARs to the container
            } else {
                metarContainer.innerHTML += `<div><strong>${airport}:</strong> Erro ao obter METAR.</div>`;
            }
        }
    } catch (error) {
        console.error('Erro ao buscar METARs:', error);
        metarContainer.innerHTML += '<div>Erro ao buscar os METARs.</div>';
    }
});

// Função para determinar as pistas em uso para um aeródromo específico
function determineRunwaysInUse(icao, metarData, currentUTCHour) {
    let runwaysInUse = [];

    // Obter informações de vento
    const windInfo = metarData.wind_direction && metarData.wind_speed
        ? { dir: metarData.wind_direction.value, speed: metarData.wind_speed.value }
        : null;
    if (!windInfo) return [];

    // Aplicar declinação magnética de 20 graus
    let wind_dir_mag = (windInfo.dir + 20) % 360;

    // Arredondar para a dezena mais próxima
    wind_dir_mag = Math.round(wind_dir_mag / 10) * 10;
    const wind_speed = windInfo.speed;

    if (icao === 'SBGR') {
        // Lógica para SBGR
        const runways = {
            '10L': 100,
            '10R': 100,
            '28L': 280,
            '28R': 280,
        };

        const componentes = {};

        for (const [runway, dir] of Object.entries(runways)) {
            let theta = wind_dir_mag - dir;
            if (theta > 180) theta -= 360;
            if (theta < -180) theta += 360;

            const componente_cauda = wind_speed * Math.cos(theta * Math.PI / 180);
            componentes[runway] = componente_cauda;
        }

        // Preferir pistas 10L/10R se a componente de cauda for menor que 6 nós
        const compCauda10 = Math.max(componentes['10L'], componentes['10R']);
        if (compCauda10 < 6) {
            runwaysInUse.push('T-10L', 'T-10R', 'L-10L', 'L-10R'); // Assuming departures are T- and arrivals are L-
        } else {
            // Comparar componentes de cauda das pistas 28L/28R
            const compCauda28 = Math.max(componentes['28L'], componentes['28R']);

            // Escolher as pistas com menor componente de vento de cauda
            if (compCauda28 <= compCauda10) {
                runwaysInUse.push('T-28L', 'T-28R', 'L-28L', 'L-28R');
            } else {
                runwaysInUse.push('T-10L', 'T-10R', 'L-10L', 'L-10R');
            }
        }
    } else if (icao === 'SBSP') {
        // Lógica para SBSP
        const runways = {
            '17L': 170,
            '17R': 170,
            '35L': 350,
            '35R': 350,
        };

        const componentes = {};

        for (const [runway, dir] of Object.entries(runways)) {
            let theta = wind_dir_mag - dir;
            if (theta > 180) theta -= 360;
            if (theta < -180) theta += 360;

            const componente_cauda = wind_speed * Math.cos(theta * Math.PI / 180);
            componentes[runway] = componente_cauda;
        }

        // Preferir pistas 17L/17R se a componente de vento for de proa (componente cauda negativa)
        const compVento17 = Math.max(componentes['17L'], componentes['17R']);
        const compVento35 = Math.max(componentes['35L'], componentes['35R']);

        if (compVento17 <= compVento35) {
            runwaysInUse.push('T-17L', 'T-17R', 'L-17L', 'L-17R');
        } else {
            runwaysInUse.push('T-35L', 'T-35R', 'L-35L', 'L-35R');
        }
    } else if (icao === 'SBSJ') {
        // Lógica para SBSJ
        const runways = {
            '15': 150,
            '33': 330,
        };

        const componentes = {};

        for (const [runway, dir] of Object.entries(runways)) {
            let theta = wind_dir_mag - dir;
            if (theta > 180) theta -= 360;
            if (theta < -180) theta += 360;

            const componente_cauda = wind_speed * Math.cos(theta * Math.PI / 180);
            componentes[runway] = componente_cauda;
        }

        // Preferir pista 15 se a componente de vento for de proa (componente cauda negativa)
        const compVento15 = componentes['15'];
        const compVento33 = componentes['33'];

        if (compVento15 <= compVento33) {
            runwaysInUse.push('T-15', 'L-15');
        } else {
            runwaysInUse.push('T-33', 'L-33');
        }
    } else if (icao === 'SBMT') {
        // Lógica para SBMT
        if (currentUTCHour >= 21 || currentUTCHour < 5) { // Consider night time as after 21 UTC or before 5 UTC
            runwaysInUse.push('T-30', 'L-30');
        } else {
            // Lógica normal baseada no vento
            const runways = {
                '12': 120,
                '30': 300,
            };

            const componentes = {};

            for (const [runway, dir] of Object.entries(runways)) {
                let theta = wind_dir_mag - dir;
                if (theta > 180) theta -= 360;
                if (theta < -180) theta += 360;

                const componente_cauda = wind_speed * Math.cos(theta * Math.PI / 180);
                componentes[runway] = componente_cauda;
            }

            // Preferir pista com menor componente de cauda
            const compCauda12 = Math.max(componentes['12'], componentes['30']);
            const compCauda30 = Math.max(componentes['30'], componentes['12']);

            if (compCauda30 <= compCauda12) {
                runwaysInUse.push('T-30', 'L-30');
            } else {
                runwaysInUse.push('T-12', 'L-12');
            }
        }
    }

    return runwaysInUse;
}

// Função para obter o procedimento preferencial de aproximação (IAP)
function getPreferredApproach(icao, runwaysInUse) {
    const approachMap = {
        'SBGR': {
            '10L': 'ILS O',
            '10R': 'ILS Y / ILS Q',
            '28L': 'ILS Y / ILS W',
            '28R': 'ILS T',
        },
        'SBSP': {
            '17L': 'RNP T',
            '17R': 'ILS X',
            '35L': 'ILS V',
            '35R': 'RNP S',
        },
        'SBKP': {
            '15': 'ILS Z',
            '33': 'RNP X',
        },
        'SBSJ': {
            '15': 'ILS T',
            '33': 'ILS DME',
        },
        'SBMT': {
            '30': '', // No IAP for SBMT as per the requirement
            '12': 'VAC',
        },
    };

    let approaches = [];
    if (approachMap[icao]) {
        runwaysInUse.forEach(runway => {
            // Remove the prefix before looking up the IAP
            const runwayKey = runway.replace(/^[TL]-/, '');
            if (approachMap[icao][runwayKey]) {
                approaches.push(`${runway} (${approachMap[icao][runwayKey]})`);
            }
        });
    }

    return approaches.join('; ');
}

// Função para determinar se deve aplicar Operação Segregada e RRSM
function shouldApplySegregatedOperations(icao, metarData) {
    if (icao === 'SBGR') {
        // Verificar condições específicas para SBGR
        const windSpeed = metarData.wind_speed.value;
        // Exemplo simplificado: aplicar se vento de cauda < 6 nós e pista seca
        // Você pode precisar de mais informações do METAR para verificar a condição da pista

        if (windSpeed < 6) {
            return true;
        }
    }
    return false;
}

// Função para exibir o ATIS na interface
function displayATIS(atisText) {
    const atisContainer = document.getElementById('atisOutput');
    atisContainer.textContent = atisText;
}

// Adicionar evento para gerar o ATIS quando necessário
document.getElementById('generateAtisButton').addEventListener('click', generateATIS);
