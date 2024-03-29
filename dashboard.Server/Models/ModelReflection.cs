using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace dashboard.Server.Models
{
    public class ModelReflection<T> where T : class
    {
        public static IEnumerable<ModelPropertyInfo> GetProperties()
        {
            var propertyInfos = typeof(T).GetProperties();
            return propertyInfos.Select(p => GetModelPropertyInfo(p));
        }

        private static ModelPropertyInfo GetModelPropertyInfo(PropertyInfo propertyInfo)
        {
            var columnName = GetColumnName(propertyInfo);
            var propertyType = GetPropertyType(propertyInfo);
            var isForeignKey = IsForeignKey(propertyInfo);

            return new ModelPropertyInfo
            {
                Name = propertyInfo.Name,
                PropertyType = propertyType,
                ColumnType = GetColumnType(propertyType),
                IsForeignKey = isForeignKey,
                ForeignKeyReference = isForeignKey ? GetForeignKeyReference(propertyInfo) : null
            };
        }

        private static string GetColumnName(PropertyInfo propertyInfo)
        {
            var columnAttribute = propertyInfo.GetCustomAttribute<ColumnAttribute>();
            return columnAttribute?.Name ?? propertyInfo.Name;
        }

        private static Type GetPropertyType(PropertyInfo propertyInfo)
        {
            return propertyInfo.PropertyType;
        }

        private static string GetColumnType(Type propertyType)
        {
            if (propertyType.IsNullable())
            {
                // Ottieni il tipo sottostante del tipo nullable
                propertyType = propertyType.GetGenericArguments()[0];
            }

            if (propertyType == typeof(string))
            {
                return "text";
            }
            else if (propertyType == typeof(int))
            {
                return "number";
            }
            else if (propertyType == typeof(DateTime))
            {
                return "date";
            }
            else
            {
                return "string"; // Tipo di dato sconosciuto, si presume stringa
            }
        }

        private static bool IsForeignKey(PropertyInfo propertyInfo)
        {
            return propertyInfo.GetCustomAttribute<ForeignKeyAttribute>() != null;
        }

        private static string GetForeignKeyReference(PropertyInfo propertyInfo)
        {
            var foreignKeyAttribute = propertyInfo.GetCustomAttribute<ForeignKeyAttribute>();
            return foreignKeyAttribute?.Name ?? "";
        }
    }

    public class ModelPropertyInfo
    {
        public string? Name { get; set; }
        public Type? PropertyType { get; set; }
        public string? ColumnType { get; set; }
        public bool IsForeignKey { get; set; }
        public string? ForeignKeyReference { get; set; }

        public string GetSelectType()
        {
            return IsForeignKey ? "singleSelect" : "text";
        }
    }
    public static class TypeExtensions
    {
        public static bool IsNullable(this Type type)
        {
            return Nullable.GetUnderlyingType(type) != null;
        }
    }
}
