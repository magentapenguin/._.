interface SoundData {
    emoji: string;
    name: string;
    file: string;
}
declare const data: { base: string, sounds: Record<string, SoundData> };

export default data;