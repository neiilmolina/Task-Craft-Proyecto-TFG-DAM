import { validateDiary, validatePartialDiary } from "../schemas/diary.js";

export class DiaryController {
  constructor({ diaryModel }) {
    this.diaryModel = diaryModel;
  }

  getAllDiaries = async (req, res) => {
    try {
      const { user_id } = req.query;
      const diaries = await this.diaryModel.getAllDiaries({ user_id });
      res.json(diaries);
    } catch (error) {
      console.error("Error fetching diaries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getDiaryById = async (req, res) => {
    try {
      const { id } = req.params;
      const diary = await this.diaryModel.getDiaryById({ id });
      if (diary) {
        res.json(diary);
      } else {
        res.status(404).json({ message: "Diary not found" });
      }
    } catch (error) {
      console.error("Error fetching diary:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createDiary = async (req, res) => {
    try {
      const { id, title,description, date, user_id } = req.body;
      const parsedDate = new Date(date);
      const result = validateDiary({
        id, title, description, date: parsedDate, user_id,
      });

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }
      const newDiary = await this.diaryModel.createDiary({ input: result.data });
      res.status(201).json(newDiary);
    } catch (error) {
      console.error("Error creating diary:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateDiary = async (req, res) => {
    try {
      const { id } = req.params;
      const {title, description, date, user_id } = req.body;
  
      // Crea un objeto para almacenar solo las propiedades definidas
      const updatedDiaryData = {};
  
      // Agrega las propiedades definidas al objeto
      if(title !== undefined){
        updatedDiaryData.title = title;
      }
      if (description !== undefined) {
        updatedDiaryData.description = description;
      }
      if (date !== undefined) {
        updatedDiaryData.date = new Date(date);
      }
      if (user_id !== undefined) {
        updatedDiaryData.user_id = user_id;
      }
  
      // Valida los datos actualizados
      const result = validatePartialDiary(updatedDiaryData);
  
      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }
  
      // Actualiza el diario solo con las propiedades definidas
      await this.diaryModel.updateDiary({ id, input: result.data });
      res.status(200).json({ message: "Diary updated successfully" });
    } catch (error) {
      console.error("Error updating diary:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deleteDiary = async (req, res) => {
    try {
      const { id } = req.params;
      await this.diaryModel.deleteDiary({ id});
      res.status(200).json({ message: "Diary deleted successfully" });
    } catch (error) {
      console.error("Error deleting diary:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
