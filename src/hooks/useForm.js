import { useState } from "react";

/**
 * Hook pour gérer les champs d'un formulaire.
 *
 * @param {Object} initialValues - les valeurs initiales du formulaire.
 * @returns {Object} - Un objet contenant:
 * _ 'values' : Les valeurs actuelles.
 * _ 'handleChange' : Fonction pour un champ contrôlé.
 * _ 'resetForm' : Fonction pour réinitialiser le formulaire.
 * _ 'setValues' : Setter direct si besoin de mise à jour manuelle
 *
 * @example
 * const { values, handleChange, resForm } = useForm({ nom: '', email: ''});
 * <input name="nom" value={values.nom} onChange={handleChange} />
 */

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "number" ? Number(value) : value;

    setValues((preval) => ({ ...preval, [name]: newValue }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm, setValues };
}

export default useForm;
