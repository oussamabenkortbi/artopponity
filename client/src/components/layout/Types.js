export const Wilaya = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum el-Bouaghi', 'Batna'
    , 'Béjaia', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset'
    , 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa'
    , 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba'
    , 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M’Sila', 'Mascara'
    , 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arreridj', 'Boumerdès'
    , 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras'
    , 'Tipaza', 'Mila', 'Naâma', 'Aïn Témouchent', 'Ghardaia', 'Relizane'
];

export const Deciplines = [
    'DJ', 
    'Musiciens', 
    'Arts du cirque/arts urbains', 
    'Comédiens', 
    'Danseurs', 
    'Photographe / Vidéaste',
    'Spectacle pour enfants',
    'Animateur'
];

// export const Categories = {
//     DJ: [ 'Animateur', 'DJ set', 'live set', 'mix' ],
//     Musiciens: [ 'A capella (chorale)', 'Instrumentale', 'Rock', 'Folk' ],
//     cirqueUrbains: [ 'Animateur', 'DJ set', 'live set', 'mix' ],
//     Comédiens: [ 'Animateur', 'DJ set', 'live set', 'mix' ],
//     Danseurs: [ 'Animateur', 'DJ set', 'live set', 'mix' ],
//     PhotographeVidéaste: [ 'Animateur', 'DJ set', 'live set', 'mix' ],
//     SpectaclepourEnfants: [ 'Animateur', 'DJ set', 'live set', 'mix' ],
//     Animateur: [ 'Animateur' ],
// }

export const Categories = {
    DJ: {
        Animateur: false,
        DJ: false,
        live: false,
        mix: false,
    },
    Musiciens: {
        Acapella: false,
        Instrumentale: false, 
        Rock: false,
        Folk: false,
        Latino: false,
        Flamenco: false,
        Blues: false,
        rap: false,
        Soul: false,
        Funk: false,
        Électronique: false,
        Acoustique: false,
        française: false,
        occidentale: false,
        algérienne: false,
        Jazz: false,
        Métal: false,
        Pop: false,
        Reggae: false,
        Soul: false, 
        ClassiqueUniversel: false,  
        Oriental: false,
        MusiqueArabe: false, 
        MusiqueTurque: false, 
        Tergui: false,
        rai: false,
        Chaabi: false,
        algérois: false, 
        chaoui: false, 
        Gnawa: false,
        Andalou: false, 
        Kabyle: false,
        Staifi: false, 
        Traditionnel: false,
        Folklorique: false,
        NewWaveAlgérien: false,
    },
    Arts: {
        Acrobat: false,
        Ballooneur: false,
        CracheurDeFeu: false,
        Jongleur: false,
        Mime: false,
        Ventriloque: false,
        Magicien: false, 
        LivePainting: false,
    },
    
    Comédiens: {
        StandUp: false,
        Humorist: false,
        Conteur: false,
        TroupeDeTheatre: false,
    },
    Danseurs: {
        Salsa: false,
        Tongo: false,
        Oriental: false,
        Moderne: false,
        Jazz: false,
        Kizomba: false,
        HipHop: false,
        Folklorique: false,
        Classique: false,
    },
    Photographe: {
        Photographe: false,
        Vidéaste: false,
    },
    Enfants: {
        Clown: false, 
        musique: false, 
        marionnettes: false, 
        magicien: false,
    },
}